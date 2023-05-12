import { Module } from '@nestjs/common'
import { SemanticService } from './semantic/semantic.service'
import { HierarchyService } from './hierarchy/hierarchy.service'
import { MetaService } from './meta/meta.service'
import { RelationService } from './relation/relation.service'
import { ContentModule } from '../content/content.module'

@Module({
  imports: [ContentModule],
  providers: [SemanticService, HierarchyService, MetaService, RelationService],
  exports: [SemanticService, HierarchyService, MetaService, RelationService],
})
export class ToolsModule {}
