import { IsUrl, IsNotEmpty } from 'class-validator';

export class ShortenUrlDto {
  @IsNotEmpty({ message: 'url must not be empty' })
  @IsUrl({ require_protocol: true }, { message: 'url must be a valid URL with a protocol (e.g. https://example.com)' })
  url: string;
}
