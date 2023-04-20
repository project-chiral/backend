import { Injectable } from '@nestjs/common'
import type { CreateCharaDto } from './dto/create-chara.dto'
import type { UpdateCharaDto } from './dto/update-chara.dto'

@Injectable()
export class CharaService {
  create(createCharaDto: CreateCharaDto) {
    return 'This action adds a new chara'
  }

  findAll() {
    return `This action returns all chara`
  }

  findOne(id: number) {
    return `This action returns a #${id} chara`
  }

  update(id: number, updateCharaDto: UpdateCharaDto) {
    return `This action updates a #${id} chara`
  }

  remove(id: number) {
    return `This action removes a #${id} chara`
  }
}
