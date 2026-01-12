from fastapi import APIRouter
from models.data_models import DashboardData, Metric
from datetime import datetime

router = APIRouter()

@router.get("/dashboard/stats", response_model=DashboardData)
async def get_dashboard_stats():
    """
    Returns mock data for the dashboard.
    """
    return DashboardData(
        user_id="user_123",
        timestamp=datetime.now().isoformat(),
        metrics=[
            Metric(
                id="revenue",
                label="Total Revenue",
                value="$45,231.89",
                change="+20.1% from last month",
                trend="up"
            ),
            Metric(
                id="users",
                label="Active Users",
                value="2,350",
                change="+180.1% from last month",
                trend="up"
            ),
            Metric(
                id="bounce_rate",
                label="Bounce Rate",
                value="12.5%",
                change="-4.5% from last month",
                trend="down"
            )
        ]
    )
