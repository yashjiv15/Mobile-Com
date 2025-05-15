from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def get_token(email, password):
    response = client.post("/api/login", data={
        "username": email,
        "password": password
    })
    return response.json()["access_token"]

def test_create_product():
    token = get_token("admin1@example.com", "testpass")
    headers = {"Authorization": f"Bearer {token}"}
    response = client.post("/api/products", json={
        "name": "iPhone 15",          # Changed from title to name
        "description": "Latest Apple phone",
        "price": 999.99,
        "quantity": 1                 # Added quantity
    }, headers=headers)
    assert response.status_code == 201
    assert response.json()["name"] == "iPhone 15"
