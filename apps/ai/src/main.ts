import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import port from 'config/port.json'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import { AiModule } from './ai.module'
import { PrismaClientExceptionFilter } from 'nestjs-prisma'

async function bootstrap() {
  const app = await NestFactory.create(AiModule)

  const config = new DocumentBuilder().addBearerAuth().build()
  const document = SwaggerModule.createDocument(app, config, {
    operationIdFactory: (_controllerKey, methodKey) => methodKey,
  })
  SwaggerModule.setup('api', app, document)

  // 允许跨域
  app.enableCors()
  // 启用验证管道，从而使class validator生效
  app.useGlobalPipes(
    new ValidationPipe({ transform: true, skipMissingProperties: false })
  )

  const { httpAdapter } = app.get(HttpAdapterHost)
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter))

  await app.listen(port.ai, '0.0.0.0')
}
bootstrap()
