// External Dependencies
import Knex, { CreateTableBuilder } from 'knex';

// Local Typings
interface DefaultColOptions {
  intPrimaryKey?: boolean;
}
interface AddressColOptions {
  includePhoneNumber?: boolean;
  isRequired?: boolean;
}

// Exports
export function getUtcNow() {
  return new Date().toISOString();
}

export function addDefaultColumns(
  knex: Knex,
  t: CreateTableBuilder,
  options?: DefaultColOptions
) {
  if (options && options.intPrimaryKey) {
    t.increments();
  } else {
    t.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
  }
  t.timestamp(
    'created_at',
    { precision: 3, useTz: false }
  ).defaultTo(knex.fn.now());
  t.timestamp(
    'updated_at',
    { precision: 3, useTz: false }
  ).defaultTo(knex.fn.now());
}

export function addAddressColumns(
  t: CreateTableBuilder,
  options: AddressColOptions = {}
) {
  if (options.isRequired) {
    t.string('address_one').notNullable();
    t.string('address_two');
    t.string('city').notNullable();
    t.string('zipcode').notNullable();
  } else {
    t.string('address_one');
    t.string('address_two');
    t.string('city');
    t.string('zipcode');
  }

  if (options.includePhoneNumber) {
    if (options.isRequired) {
      t.string('phone_number').notNullable();
    } else {
      t.string('phone_number');
    }
  }
}
