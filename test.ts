import { IsamErrorConstraintFailed } from '../isam-errors';
import { Id, IdPrimaryKeyPair, PrimaryKey, StringPrimaryKey } from '../types';
import { valueExists } from '../utils';

interface EntityCtr<T> {
  new (props: T, idPrimaryKey: IdPrimaryKeyPair);
}

export abstract class Entity<T> {
  [index: string]: any; // allow proxy getter to work

  /**
   *
   * @param props
   * @param idPrimaryKey a pair so that either both values or no values are provided
   */
  constructor(
    public readonly props: T,
    private readonly idPrimaryKey: IdPrimaryKeyPair = [null, null],
  ) {}

  /**
   * Create a copy of entity with values updated to match those
   * in the provided props
   * Note: Prop keys with no value (undefined) will be ignored. This allows
   * use to just pass DTO properties as props using spread syntax
   * @param props
   * @returns IdentityProvider
   */
  patch(props: Partial<T>): this {
    const mergedProps = Object.keys(props).reduce(
      (merged, key) => {
        // Only overwrite keys that have values
        const value = props[key];
        if (value !== undefined) {
          merged[key] = value;
        }
        return merged;
      },
      { ...this.props },
    );

    const ctr = this.constructor as EntityCtr<T>;
    const clone = new ctr(mergedProps, [this.id, this.primaryKey]);
    return proxyEntity(clone);
  }

  public get id(): Id {
    return this.idPrimaryKey && this.idPrimaryKey[0];
  }

  public get primaryKey(): PrimaryKey {
    return this.idPrimaryKey[1] as PrimaryKey;
  }

  public get stringPrimaryKey(): StringPrimaryKey {
    return this.idPrimaryKey[1] as StringPrimaryKey;
  }

  public get isPersisted(): boolean {
    return valueExists(this.primaryKey);
  }

  private static isEntity(v: any): v is Entity<any> {
    return v instanceof Entity;
  }

  public equals(object?: Entity<T>): boolean {
    if (!valueExists(object)) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!Entity.isEntity(object)) {
      return false;
    }

    return this.id === object.id;
  }

  public constraintPreventAddingExistingEntity(entityName: string): void {
    // Prevent accidentally adding an entity that already exists
    if (this.isPersisted) {
      throw IsamErrorConstraintFailed(`${entityName} already exists`, {
        entity: this,
      });
    }
  }
}

export const proxyEntity = <E extends Entity<unknown>>(entity: E): E => {
  // Cache once for later
  const propKeys = new Set(Object.keys(entity.props));

  return new Proxy(entity, {
    get: function (target: E, property: string) {
      if (propKeys.has(property)) {
        return entity.props[property];
      }
      return Reflect.get(target, property);
    },
  });
};
