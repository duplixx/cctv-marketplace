from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.collection import Collection
import os
from dotenv import load_dotenv

load_dotenv()

class Database:
    client: AsyncIOMotorClient = None
    users_collection: Collection = None

    async def connect_db(self):
        self.client = AsyncIOMotorClient(os.getenv("MONGODB_URL"))
        self.users_collection = self.client[os.getenv("DATABASE_NAME")].users

    async def close_db(self):
        if self.client:
            self.client.close()

db = Database()