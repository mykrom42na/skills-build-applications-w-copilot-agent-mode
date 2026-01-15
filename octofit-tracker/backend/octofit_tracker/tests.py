from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import User, Team, Activity, Workout, LeaderboardEntry

class UserTests(APITestCase):
    def test_create_user(self):
        user = User.objects.create_user(username='testuser', password='testpass')
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(user.username, 'testuser')

class TeamTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='teamuser', password='pass')
    def test_create_team(self):
        team = Team.objects.create(name='TeamA')
        team.members.add(self.user)
        self.assertEqual(Team.objects.count(), 1)
        self.assertIn(self.user, team.members.all())

class ActivityTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='activityuser', password='pass')
    def test_create_activity(self):
        activity = Activity.objects.create(user=self.user, activity_type='run', duration=30, date='2024-01-01')
        self.assertEqual(Activity.objects.count(), 1)
        self.assertEqual(activity.activity_type, 'run')

class WorkoutTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='workoutuser', password='pass')
    def test_create_workout(self):
        workout = Workout.objects.create(user=self.user, name='Pushups', date='2024-01-01')
        self.assertEqual(Workout.objects.count(), 1)
        self.assertEqual(workout.name, 'Pushups')

class LeaderboardEntryTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='leaderuser', password='pass')
        self.team = Team.objects.create(name='TeamB')
        self.team.members.add(self.user)
    def test_create_leaderboard_entry(self):
        entry = LeaderboardEntry.objects.create(user=self.user, team=self.team, score=100, rank=1)
        self.assertEqual(LeaderboardEntry.objects.count(), 1)
        self.assertEqual(entry.score, 100)
