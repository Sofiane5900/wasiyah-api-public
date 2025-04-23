export interface UrlGeneratorInterface {
  generate(path: string, params?: Record<string, string | number>): string;
  generateAbsolute(
    path: string,
    params?: Record<string, string | number>,
  ): string;
}
