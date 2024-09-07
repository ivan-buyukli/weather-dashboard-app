import {Expose} from "class-transformer";

export class City {
  private _lat: string;

  private _lon: string;

  private _type: string;

  @Expose({name: 'display_name'})
  private _displayName: string;

  @Expose({name: 'display_place'})
  private _displayPlace: string;

  @Expose({name: 'display_address'})
  private _displayAddress: string;

  private _address: Address;

  get lat(): string {
    return this._lat;
  }

  set lat(value: string) {
    this._lat = value;
  }

  get address(): Address {
    return this._address;
  }

  set address(value: Address) {
    this._address = value;
  }

  get displayAddress(): string {
    return this._displayAddress;
  }

  set displayAddress(value: string) {
    this._displayAddress = value;
  }

  get displayPlace(): string {
    return this._displayPlace;
  }

  set displayPlace(value: string) {
    this._displayPlace = value;
  }

  get displayName(): string {
    return this._displayName;
  }

  set displayName(value: string) {
    this._displayName = value;
  }

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }

  get lon(): string {
    return this._lon;
  }

  set lon(value: string) {
    this._lon = value;
  }

  constructor(lat: string, lon: string, type: string, displayName: string, displayPlace: string, displayAddress: string, address: Address) {
    this._lat = lat;
    this._lon = lon;
    this._type = type;
    this._displayName = displayName;
    this._displayPlace = displayPlace;
    this._displayAddress = displayAddress;
    this._address = address;
  }
}

export class Address {
  private _name: string;

  private _state: string;

  private _country: string;

  @Expose({name: 'country_code'})
  private _countryCode: string;

  get countryCode(): string {
    return this._countryCode;
  }

  set countryCode(value: string) {
    this._countryCode = value;
  }

  get country(): string {
    return this._country;
  }

  set country(value: string) {
    this._country = value;
  }

  get state(): string {
    return this._state;
  }

  set state(value: string) {
    this._state = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  constructor(name: string, state: string, country: string, countryCode: string) {
    this._name = name;
    this._state = state;
    this._country = country;
    this._countryCode = countryCode;
  }
}
