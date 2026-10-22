import unittest
import json
import sys

try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass

from app import app

class BackendApiTestCase(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()

    def test_health(self):
        response = self.client.get('/api/health')
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertEqual(data["status"], "online")
        self.assertTrue(data["model_loaded"])
        self.assertEqual(data["dataset_rows"], 20640)
        print("✓ Healthcheck Test Passed:", data["service"])

    def test_models(self):
        response = self.client.get('/api/models')
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertEqual(len(data), 3)
        self.assertEqual(data[0]["id"], "xgboost")
        self.assertTrue(data[0]["is_best"])
        print("✓ Models Benchmark Test Passed (3 models verified)")

    def test_presets(self):
        response = self.client.get('/api/presets')
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertEqual(len(data), 5)
        print("✓ Showcase Presets Test Passed (5 presets verified)")

    def test_california_predict(self):
        payload = {
            "latitude": 37.88,
            "longitude": -122.23,
            "housing_median_age": 25,
            "total_rooms": 2000,
            "total_bedrooms": 400,
            "population": 1200,
            "households": 350,
            "median_income": 8.32,
            "ocean_proximity": "NEAR BAY",
            "model_type": "xgboost"
        }
        response = self.client.post('/api/predict', data=json.dumps(payload), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertTrue(data["success"])
        self.assertGreater(data["price_usd"], 50000)
        self.assertIn("formatted_usd", data)
        self.assertIn("formatted_inr", data)
        self.assertIn("investment_radar", data)
        print(f"✓ California ML Prediction Test Passed: {data['formatted_usd']} | {data['formatted_inr']}")

    def test_global_predict(self):
        payload = {
            "city": "Mumbai",
            "country": "India",
            "latitude": 19.0596,
            "longitude": 72.8295,
            "housing_median_age": 8,
            "total_rooms": 2400,
            "total_bedrooms": 480,
            "population": 1600,
            "households": 420,
            "median_income": 7.5,
            "ocean_proximity": "NEAR OCEAN"
        }
        response = self.client.post('/api/predict', data=json.dumps(payload), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertTrue(data["success"])
        self.assertFalse(data["is_california"])
        print(f"✓ Global Regional Valuation Test Passed (Mumbai): {data['formatted_usd']} | {data['formatted_inr']}")

    def test_explainability(self):
        payload = {
            "median_income": 8.32,
            "housing_median_age": 25,
            "total_rooms": 2000,
            "total_bedrooms": 400,
            "ocean_proximity": "NEAR BAY",
            "price_usd": 420000.0
        }
        response = self.client.post('/api/explain', data=json.dumps(payload), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertTrue(data["success"])
        self.assertGreater(len(data["waterfall"]), 3)
        print("✓ XAI Feature Waterfall Test Passed (5 feature drivers)")

    def test_comps(self):
        payload = {
            "latitude": 37.88,
            "longitude": -122.23
        }
        response = self.client.post('/api/comps', data=json.dumps(payload), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertTrue(data["success"])
        self.assertEqual(len(data["comps"]), 3)
        self.assertTrue(data["comps"][0]["is_ground_truth"])
        print(f"✓ Nearby Comps Radar Test Passed (Found 3 nearest sales, closest={data['comps'][0]['distance_km']}km)")

if __name__ == '__main__':
    unittest.main()
