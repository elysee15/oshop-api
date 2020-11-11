import { Type } from "class-transformer";
import { IsOptional, IsPositive } from "class-validator";

export class PaginationQuery {
  @IsOptional()
  q: string;

  @IsPositive()
  @IsOptional()
  limit: number;

  @IsPositive()
  @IsOptional()
  offset: number;
}
