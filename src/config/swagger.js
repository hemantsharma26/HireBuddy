const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "HireBuddy API",
      version: "1.0.0",
      description:
        "HireBuddy — Peer-to-peer instant help platform API documentation",
      contact: {
        name: "HireBuddy Team",
      },
    },
    servers: [
      {
        url: "/api/v1",
        description: "API v1",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter your JWT access token",
        },
      },
      schemas: {
        SuccessResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            message: { type: "string" },
            data: { type: "object" },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            error: {
              type: "object",
              properties: {
                code: { type: "string" },
                message: { type: "string" },
              },
            },
          },
        },
        ValidationError: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            error: {
              type: "object",
              properties: {
                code: { type: "string", example: "VALIDATION_ERROR" },
                message: { type: "string", example: "Validation failed" },
                details: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      field: { type: "string" },
                      message: { type: "string" },
                    },
                  },
                },
              },
            },
          },
        },
        PaginationResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            data: { type: "object" },
            pagination: {
              type: "object",
              properties: {
                page: { type: "integer", example: 1 },
                limit: { type: "integer", example: 10 },
                total: { type: "integer" },
                pages: { type: "integer" },
              },
            },
          },
        },
        User: {
          type: "object",
          properties: {
            _id: { type: "string" },
            displayName: { type: "string", example: "John Doe" },
            email: { type: "string", example: "john@example.com" },
            phoneNumber: { type: "string", example: "9876543210" },
            dateOfBirth: {
              type: "string",
              format: "date",
              example: "2000-01-15",
            },
            age: { type: "integer", example: 25 },
            bio: { type: "string" },
            role: { type: "string", enum: ["user", "admin", "support"] },
            status: {
              type: "string",
              enum: ["active", "suspended", "banned", "inactive"],
            },
            availability: {
              type: "object",
              properties: {
                isAvailable: { type: "boolean" },
                schedule: { type: "object" },
              },
            },
            location: {
              type: "object",
              properties: {
                city: { type: "string" },
                area: { type: "string" },
                coordinates: {
                  type: "object",
                  properties: {
                    type: { type: "string", example: "Point" },
                    coordinates: { type: "array", items: { type: "number" } },
                  },
                },
              },
            },
            ratings: {
              type: "object",
              properties: {
                average: { type: "number" },
                count: { type: "integer" },
              },
            },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        HiringRequest: {
          type: "object",
          properties: {
            _id: { type: "string" },
            requesterId: { type: "string" },
            title: { type: "string" },
            description: { type: "string" },
            category: { type: "string" },
            jobType: { type: "string" },
            location: {
              type: "object",
              properties: {
                city: { type: "string" },
                area: { type: "string" },
              },
            },
            compensation: { type: "string" },
            duration: { type: "string" },
            status: {
              type: "string",
              enum: ["open", "in-progress", "completed", "cancelled"],
            },
            applicants: { type: "array", items: { type: "object" } },
            viewCount: { type: "integer" },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        Chat: {
          type: "object",
          properties: {
            _id: { type: "string" },
            participants: { type: "array", items: { type: "string" } },
            requestId: { type: "string" },
            lastMessage: {
              type: "object",
              properties: {
                content: { type: "string" },
                senderId: { type: "string" },
                sentAt: { type: "string", format: "date-time" },
              },
            },
            unreadCount: { type: "object" },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        Message: {
          type: "object",
          properties: {
            _id: { type: "string" },
            chatId: { type: "string" },
            senderId: { type: "string" },
            content: { type: "string" },
            messageType: { type: "string", enum: ["text", "image", "system"] },
            isRead: { type: "boolean" },
            readAt: { type: "string", format: "date-time" },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        Rating: {
          type: "object",
          properties: {
            _id: { type: "string" },
            requestId: { type: "string" },
            raterId: { type: "string" },
            ratedUserId: { type: "string" },
            stars: { type: "integer", minimum: 1, maximum: 5 },
            review: { type: "string" },
            ratingType: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        Report: {
          type: "object",
          properties: {
            _id: { type: "string" },
            reporterId: { type: "string" },
            reportedUserId: { type: "string" },
            reportedRequestId: { type: "string" },
            reason: { type: "string" },
            description: { type: "string" },
            status: {
              type: "string",
              enum: ["pending", "investigating", "resolved", "dismissed"],
            },
            priority: {
              type: "string",
              enum: ["low", "medium", "high", "critical"],
            },
            createdAt: { type: "string", format: "date-time" },
          },
        },
      },
    },
    tags: [
      { name: "Auth", description: "Authentication — Register, Login, OTP" },
      { name: "Users", description: "User profile management" },
      { name: "Requests", description: "Hiring request operations" },
      { name: "Chat", description: "Chat and messaging" },
      { name: "Ratings", description: "Rating and reviews" },
      { name: "Reports", description: "Reports and user blocking" },
      {
        name: "Admin",
        description: "Admin panel operations (admin/support roles)",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
