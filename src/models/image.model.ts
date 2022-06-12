import {
  getModelForClass,
  modelOptions,
  prop,
  Severity,
} from '@typegoose/typegoose';

export const privateFields = ['__v'];

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class Image {
  @prop({ required: true, unique: true, index: true })
  public id?: string;

  @prop({ required: true })
  public author?: string;

  @prop({ required: true })
  public width?: number;

  @prop({ required: true })
  public height?: number;

  @prop({ required: true })
  public url?: string;

  @prop({ required: true })
  public download_url?: string;

  @prop({ required: true })
  public grayimage_url?: string;

  @prop({ unique: true })
  public grayimage_id?: number;
}

const ImageModel = getModelForClass(Image);

export default ImageModel;
