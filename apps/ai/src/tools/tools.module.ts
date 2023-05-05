import { Module } from '@nestjs/common'
import { VecstoreModule } from '../vecstore/vecstore.module'
import { SemanticService } from './semantic/semantic.service'
import { HierarchyService } from './hierarchy/hierarchy.service'
import { MetaService } from './meta/meta.service'
import { RelationService } from './relation/relation.service'

@Module({
  imports: [VecstoreModule],
  providers: [SemanticService, HierarchyService, MetaService, RelationService],
  exports: [SemanticService, HierarchyService, MetaService, RelationService],
})
export class ToolsModule {}
