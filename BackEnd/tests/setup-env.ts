process.env.PORT = process.env.PORT ?? "3333"
process.env.DATABASE_URL = process.env.TEST_DATABASE_URL ?? process.env.DATABASE_URL ?? "postgresql://helpdesk:helpdesk@localhost:5432/helpdesk_test?schema=public"
process.env.JWT_SECRET = process.env.JWT_SECRET ?? "test-secret-with-at-least-16-chars"
process.env.JWT_EXPIRES_IN = "1d"
