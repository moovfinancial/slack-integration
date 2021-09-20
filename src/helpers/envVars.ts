export function requireEnvVar(name: string): string {
  const variable = process.env[name];
  if (!variable) {
    console.error(`${name} environment variable is required`);
    process.exit(1);
  }
  return variable;
}
