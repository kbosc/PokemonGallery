  // try to remove error with audio file
  declare module "*.mp3" {
    const src: string;
    export default src;
  }
  