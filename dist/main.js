"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    const configService = new config_1.ConfigService();
    if (configService.get('NODE_ENV') != 'production') {
        const config = new swagger_1.DocumentBuilder()
            .setTitle('Insure-Auto-go')
            .addBearerAuth()
            .setDescription('Insure-Auto-go Basic Services')
            .setExternalDoc('Postman Collection', '/api-json')
            .setVersion('1.0')
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup('api', app, document);
    }
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
    }));
    await app.listen(5555);
}
bootstrap();
//# sourceMappingURL=main.js.map