// Minimal hand-rolled schema validator (no external dependencies).

export type ValidationIssue = { field: string; message: string };

export type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; issues: ValidationIssue[] };

interface InternalResult<T> {
  issues: ValidationIssue[];
  data?: T;
}

export interface Schema<T> {
  optional(): Schema<T | undefined>;
  safeParse(value: unknown): ValidationResult<T>;
  _check(value: unknown, path: string): InternalResult<T>;
}

function finalize<T>(result: InternalResult<T>): ValidationResult<T> {
  return result.issues.length === 0
    ? { success: true, data: result.data as T }
    : { success: false, issues: result.issues };
}

function optionalSchema<T>(inner: Schema<T>): Schema<T | undefined> {
  const schema: Schema<T | undefined> = {
    optional() {
      return schema;
    },
    _check(value, path) {
      if (value === undefined) return { issues: [], data: undefined };
      return inner._check(value, path);
    },
    safeParse(value) {
      return finalize(schema._check(value, ""));
    },
  };
  return schema;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface StringSchema extends Schema<string> {
  min(length: number, message?: string): StringSchema;
  email(message?: string): StringSchema;
}

function stringSchema(rules: Array<(v: string) => string | null> = []): StringSchema {
  const schema: StringSchema = {
    min(length, message = `Must be at least ${length} characters`) {
      return stringSchema([...rules, (v) => (v.length < length ? message : null)]);
    },
    email(message = "Invalid email address") {
      return stringSchema([...rules, (v) => (EMAIL_RE.test(v) ? null : message)]);
    },
    optional() {
      return optionalSchema(schema);
    },
    _check(value, path) {
      if (value === undefined) {
        return { issues: [{ field: path, message: "Required" }] };
      }
      if (typeof value !== "string") {
        return { issues: [{ field: path, message: "Expected a string" }] };
      }
      for (const rule of rules) {
        const message = rule(value);
        if (message) return { issues: [{ field: path, message }] };
      }
      return { issues: [], data: value };
    },
    safeParse(value) {
      return finalize(schema._check(value, ""));
    },
  };
  return schema;
}

type InferShape<Shape extends Record<string, Schema<any>>> = {
  [K in keyof Shape]: Shape[K] extends Schema<infer T> ? T : never;
};

function objectSchema<Shape extends Record<string, Schema<any>>>(
  shape: Shape
): Schema<InferShape<Shape>> {
  const schema: Schema<InferShape<Shape>> = {
    optional() {
      return optionalSchema(schema);
    },
    _check(value, path) {
      if (typeof value !== "object" || value === null || Array.isArray(value)) {
        return { issues: [{ field: path, message: "Expected an object" }] };
      }
      const input = value as Record<string, unknown>;
      const issues: ValidationIssue[] = [];
      const data = {} as InferShape<Shape>;
      for (const key of Object.keys(shape) as Array<keyof Shape>) {
        const fieldPath = path ? `${path}.${String(key)}` : String(key);
        const result = shape[key]._check(input[key as string], fieldPath);
        issues.push(...result.issues);
        if (result.issues.length === 0) data[key] = result.data as InferShape<Shape>[typeof key];
      }
      return issues.length === 0 ? { issues: [], data } : { issues };
    },
    safeParse(value) {
      return finalize(schema._check(value, ""));
    },
  };
  return schema;
}

export const v = {
  string: (): StringSchema => stringSchema(),
  object: <Shape extends Record<string, Schema<any>>>(shape: Shape) => objectSchema(shape),
};
