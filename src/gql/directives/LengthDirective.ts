// External Dependencies
import { SchemaDirectiveVisitor, ValidationError } from 'apollo-server-express';
import { GraphQLInputField, Kind } from 'graphql';

// Internal Dependencies
import {
  ValidationConstraint,
  ValidationType,
} from './types';

class LengthConstraint implements ValidationConstraint {
  private readonly args: { [name: string]: any };

  constructor(args: { [name: string]: any }) {
    this.args = args;
  }

  getName(): string {
    return 'Length';
  }

  validate(value) {
    const {
      max = Infinity,
      min = 0,
    } = this.args;

    if (typeof value === 'string' && value.length > max) {
      throw new ValidationError(`Length of ${value.length} exceeds max of ${max}`);
    }

    if (typeof value === 'string' && value.length < min) {
      throw new ValidationError(`Must be at least ${min} characters`);
    }
  }

  getCompatibleScalarKinds(): string[] {
    return [Kind.STRING];
  }
}

export class LengthDirective extends SchemaDirectiveVisitor {
  visitInputFieldDefinition(field: GraphQLInputField): GraphQLInputField | void | null {
    field.type = ValidationType.create(field.type, new LengthConstraint(this.args));
  }
}
