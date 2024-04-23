declare module "*.hbs" {
    const content: (data: any) => string;
    export default content;
  }

declare module "*svg" {
    const content: any;
    export default content;
}