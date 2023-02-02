import { Comparable } from '../interfaces/comparable.interface';
import { Serializable } from '../interfaces/serializable.interface';

export abstract class ResourceModel<T>
  implements Comparable<ResourceModel<T>>, Serializable
{
  id?: string;

  constructor(model?: Partial<T>) {
    if (model) {
      Object.assign(this, model);
    }
  }

  public serialize(): any {
    return JSON.parse(JSON.stringify(this));
  }

  public equals(model: ResourceModel<T>) {
    return this.id === model.id;
  }
}
