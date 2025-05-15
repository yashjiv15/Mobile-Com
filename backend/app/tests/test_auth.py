from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_signup():
    response = client.post("/api/signup", json={
        "email": "admin1@example.com",
        "password": "testpass",
        "role": "admin"
    })
    assert response.status_code == 201 or response.status_code == 400  # 400 if already exists

def test_login():
    response = client.post("/api/login", data={
        "username": "admin1@example.com",
        "password": "testpass"
    })
    assert response.status_code == 200
    assert "access_token" in response.json()
