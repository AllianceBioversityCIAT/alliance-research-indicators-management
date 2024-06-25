export class CreateViewComponentDto {
  sec_view_component_id: string;
  component_type_id: number;
}

export class CreateViewComponentListDto {
  view_components: CreateViewComponentDto[];
}
