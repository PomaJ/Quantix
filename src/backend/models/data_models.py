from pydantic import BaseModel
from typing import List, Optional

class Metric(BaseModel):
    id: str
    label: str
    value: str
    change: str
    trend: str # 'up' | 'down' | 'neutral'

class DashboardData(BaseModel):
    user_id: str
    timestamp: str
    metrics: List[Metric]

class ErrorResponse(BaseModel):
    error: str
    code: int
