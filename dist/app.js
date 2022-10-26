"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const example_route_1 = __importDefault(require("./routes/example-route"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const app = (0, express_1.default)();
const options = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "REST API for Swagger Documentation",
            version: "1.0.0",
        },
        schemes: ["http"],
        servers: [{ url: "http://localhost:3000/" }],
    },
    apis: [
        `${__dirname}/routes/example-route.ts`,
        "./dist/routes/example-route.js",
    ],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
app.use(body_parser_1.default.json());
app.use(example_route_1.default);
app.listen(3000);
