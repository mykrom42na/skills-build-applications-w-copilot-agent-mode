from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from djongo import models
from pymongo import MongoClient
from django.conf import settings

# Sample data
USERS = [
    {"name": "Clark Kent", "email": "superman@dc.com", "team": "DC"},
    {"name": "Bruce Wayne", "email": "batman@dc.com", "team": "DC"},
    {"name": "Diana Prince", "email": "wonderwoman@dc.com", "team": "DC"},
    {"name": "Tony Stark", "email": "ironman@marvel.com", "team": "Marvel"},
    {"name": "Steve Rogers", "email": "captain@marvel.com", "team": "Marvel"},
    {"name": "Natasha Romanoff", "email": "blackwidow@marvel.com", "team": "Marvel"},
]

TEAMS = [
    {"name": "Marvel", "description": "Earth's Mightiest Heroes"},
    {"name": "DC", "description": "Justice League"},
]

ACTIVITIES = [
    {"user_email": "superman@dc.com", "activity": "Flight", "duration": 60},
    {"user_email": "batman@dc.com", "activity": "Martial Arts", "duration": 45},
    {"user_email": "ironman@marvel.com", "activity": "Suit Training", "duration": 50},
]

LEADERBOARD = [
    {"team": "Marvel", "points": 150},
    {"team": "DC", "points": 120},
]

WORKOUTS = [
    {"name": "Super Strength", "description": "Heavy lifting and resistance training"},
    {"name": "Agility", "description": "Speed and flexibility drills"},
]

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        client = MongoClient(settings.DATABASES['default']['CLIENT']['host'])
        db = client[settings.DATABASES['default']['NAME']]

        # Drop collections if they exist
        db.users.drop()
        db.teams.drop()
        db.activities.drop()
        db.leaderboard.drop()
        db.workouts.drop()

        # Insert test data
        db.users.insert_many(USERS)
        db.teams.insert_many(TEAMS)
        db.activities.insert_many(ACTIVITIES)
        db.leaderboard.insert_many(LEADERBOARD)
        db.workouts.insert_many(WORKOUTS)

        # Ensure unique index on email
        db.users.create_index("email", unique=True)

        self.stdout.write(self.style.SUCCESS('octofit_db populated with test data.'))
