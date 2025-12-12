export interface ItemDto extends ItemCardDto {}

export interface ItemCardDto {
  id: number;
  name: string;
  item: ItemDetailDto;
}

export interface ItemDetailDto {
  itemsprites: ItemSpriteDto[];
}

export interface ItemSpriteDto {
  sprites: ItemSprites;
}

export interface ItemSprites {
  default: string;
}
