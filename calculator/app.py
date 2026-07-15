from __future__ import annotations

import streamlit as st


st.set_page_config(page_title="TinCap Calculator Legacy", page_icon="TC", layout="wide")

st.sidebar.title("Меню")
menu_item = st.sidebar.radio(
    "Разделы",
    ["Новый расчёт", "История расчётов", "Настройки"],
    label_visibility="collapsed",
)

st.title("TinCap Calculator")
st.subheader("Legacy prototype")

st.markdown(
    """
    Этот Streamlit-экран сохранён только как старый прототип.

    Активная разработка TinCap OS сейчас находится в `frontend/`.
    """
)

st.divider()

if menu_item == "Новый расчёт":
    st.info("Новый функционал здесь не развивается.")
elif menu_item == "История расчётов":
    st.info("История расчётов не подключена.")
else:
    st.info("Настройки не подключены.")
