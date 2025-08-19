import datetime
import streamlit as st
import pandas as pd
import plotly.graph_objects as go

# ------------------------
# شبیه‌سازی آینده مالی کاربر
# ------------------------

def simulate_financial_future(
    income: float,
    expenses: float,
    goal_amount: float,
    months_to_goal: int,
    personality: str = "moderate"
):
    savings_rate = {
        "conservative": 0.4,
        "moderate": 0.25,
        "risky": 0.1
    }.get(personality, 0.25)

    monthly_savings = max(income - expenses, 0) * savings_rate
    total_savings = 0
    projection = []

    for month in range(1, months_to_goal + 1):
        total_savings += monthly_savings
        projection.append({
            "ماه": month,
            "تاریخ": (datetime.date.today() + datetime.timedelta(days=30*month)).strftime("%Y-%m"),
            "پس‌انداز شده": round(total_savings, 2),
            "باقی‌مانده تا هدف": max(0, goal_amount - total_savings)
        })

    success = total_savings >= goal_amount

    return success, projection, generate_summary(goal_amount, total_savings, months_to_goal, success)

# ------------------------
# تولید گزارش مالی به زبان ساده
# ------------------------

def generate_summary(goal: float, saved: float, months: int, success: bool) -> str:
    if success:
        return f"✅ تبریک! با نرخ فعلی پس‌انداز، شما در عرض {months} ماه به هدفتان ({goal:,.0f} تومان) خواهید رسید."
    else:
        shortfall = goal - saved
        return f"⚠️ با نرخ فعلی، شما بعد از {months} ماه حدود {saved:,.0f} تومان پس‌انداز خواهید داشت که {shortfall:,.0f} تومان کمتر از هدف مورد نظرتان است."

# ------------------------
# رسم چارت حرفه‌ای با Plotly
# ------------------------

def render_custom_chart(df):
    fig = go.Figure()
    fig.add_trace(go.Scatter(
        x=df['ماه'],
        y=df['پس‌انداز شده'],
        mode='lines+markers',
        name='پس‌انداز شده',
        line=dict(width=3)
    ))

    fig.add_trace(go.Scatter(
        x=df['ماه'],
        y=df['باقی‌مانده تا هدف'],
        mode='lines+markers',
        name='باقی‌مانده تا هدف',
        line=dict(dash='dot', color='firebrick')
    ))

    fig.update_layout(
        title='روند پس‌انداز ماهانه',
        xaxis_title='ماه',
        yaxis_title='مبلغ (تومان)',
        template='plotly_white',
        legend=dict(x=0, y=1.1, orientation="h")
    )

    st.plotly_chart(fig, use_container_width=True)

# ------------------------
# رابط کاربری با Streamlit
# ------------------------

def main():
    st.set_page_config(page_title="شبیه‌ساز آینده مالی", layout="centered")
    st.title("🤖 شبیه‌ساز هوشمند آینده مالی")

    st.markdown("""
    این ابزار با توجه به درآمد، هزینه، و هدف مالی شما، آینده‌ی مالی‌تان را پیش‌بینی می‌کند و گزارشی به زبان ساده ارائه می‌دهد.
    """)

    with st.form("financial_form"):
        income = st.number_input("درآمد ماهانه (تومان)", value=20000000)
        expenses = st.number_input("هزینه‌های ماهانه (تومان)", value=15000000)
        goal_amount = st.number_input("مبلغ هدف (مثلاً خرید خانه - تومان)", value=100000000)
        months = st.slider("مدت زمان تا رسیدن به هدف (ماه)", 1, 60, 12)
        personality = st.selectbox("شخصیت مالی شما", ["conservative", "moderate", "risky"])

        submitted = st.form_submit_button("🔍 شبیه‌سازی کن")

    if submitted:
        success, projection, summary = simulate_financial_future(
            income, expenses, goal_amount, months, personality
        )

        st.subheader("📊 گزارش شخصی مالی")
        st.success(summary) if success else st.warning(summary)

        df = pd.DataFrame(projection)
        render_custom_chart(df)
        st.dataframe(df, use_container_width=True)

if __name__ == "__main__":
    main()
