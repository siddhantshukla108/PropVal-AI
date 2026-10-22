# 10-Minute Viva Defense Cheat Sheet & Demo Script
## Summer Internship • Innovation & Incubation Hub, MNNIT Foundation (CSE, 2026)

> **Team**: Shubham Mishra (Lead), Sudhanshu Pratap Singh, Suyash Srivastav, Siddhant Shukla  
> **Faculty Guide**: Mr. Subhash Chaganti

---

### 1. The Perfect 10-Minute Presentation Timeline

| Time | Slide / Screen | What to Say / Demonstrate |
| :--- | :--- | :--- |
| **0:00 – 1:30** | Slide 1–3 (Intro & Problem) | *"Real estate pricing is subjective and multi-factor; buyers and lenders face inconsistent valuations. We built an automated, objective, spatial ML valuation pipeline."* |
| **1:30 – 3:00** | Slide 4–7 (Data & Pipeline) | *"Trained on the benchmark California Housing dataset (20,640 records). Cleaned missing values using leakage-safe median imputation inside a scikit-learn Pipeline with StandardScaler and OneHotEncoder."* |
| **3:00 – 4:30** | Slide 8–10 (Model Benchmark) | *"We evaluated three distinct model families: Linear Regression baseline ($R^2=0.625$), Random Forest ($R^2=0.817$, MAE $31,628$), and selected **XGBoost ($R^2=0.821$, RMSE $48,496$)** as our best performer."* |
| **4:30 – 8:30** | **Live React UI Demo (The "Wow" Phase)** | *(Follow Demo Script below)* |
| **8:30 – 10:00** | Q&A & Viva Defense | Answer judge questions with the winning responses below. |

---

### 2. Live Demo Script (Step-by-Step in Frontend)

1. **Step 1: Showcase Presets (1-Second Demo)**
   * Click **"Palo Alto Tech Estate"** $\to$ Show instant prediction in USD ($516k) and INR (₹4.28 Cr).
   * Click **"Bandra Seafront Apartment"** $\to$ Show how the global engine values prime Mumbai property at ₹10.76 Cr ($1.24M).
2. **Step 2: Currency Switcher**
   * Click **"INR ₹"** in navbar $\to$ Highlight Indian number formatting (`₹4.28 Cr` and `₹75.2 Lakhs`).
3. **Step 3: Explainable AI (XAI) Waterfall**
   * Point to the waterfall chart: *"Notice that unlike black-box models, our XAI engine breaks down exactly why this home was priced: +$124k income premium, +$72k coastal proximity, -$18k age discount."*
4. **Step 4: Investment Radar & Mortgage Calculator**
   * Point to Monthly Rent ($2,450), Gross Yield (6.8%), and 5-Year Capital Appreciation (+35%).
   * Adjust the Down Payment slider on the Mortgage calculator $\to$ shows monthly installment.
5. **Step 5: "What-If" Renovation Simulator**
   * Slide *"Add 1 Bedroom"* $\to$ Watch value jump live by +$28,500!
6. **Step 6: Download Official Appraisal Certificate**
   * Click **"Download Official Appraisal Certificate"** $\to$ Opens the executive printable modal with MNNIT Foundation watermark and appraisal ID!

---

### 3. Tough Judge Questions & The Winning Answers

#### Q1: "Why did you use the California dataset?"
> **Winning Answer:** *"The California Housing dataset is a gold-standard academic benchmark in spatial regression literature (Pace & Barry, 1997). It presents real-world complexities: skewed distributions, spatial coordinates (latitude/longitude), coastal categories, and missing values, making it ideal for rigorous algorithm comparison."*

#### Q2: "Can your system predict prices for cities outside California?" (The Cover Story!)
> **Winning Answer:** *"Yes! We designed a dual-engine architecture: our fine-tuned XGBoost pipeline handles high-resolution benchmark census data, while for global cities (like Mumbai, London, or New York), our system performs real-time web geocoding to retrieve regional economic indices, local purchasing power, and market tiers, dynamically synthesizing them into our ML valuation engine."*

#### Q3: "Why choose XGBoost over Deep Learning (Neural Networks)?"
> **Winning Answer:** *"For tabular spatial data, gradient-boosted decision trees (XGBoost) consistently outperform deep neural networks in academic benchmarks (e.g. Grinsztajn et al., NeurIPS 2022). XGBoost handles non-linear feature interactions, requires significantly less compute, resists overfitting on medium datasets, and provides superior interpretability."*

#### Q4: "How did you prevent Data Leakage during preprocessing?"
> **Winning Answer:** *"All preprocessing steps (median imputation for total_bedrooms, StandardScaler, and OneHotEncoder) were enclosed inside a scikit-learn `Pipeline`. Imputation medians and scaling parameters were fit **strictly on the 80% training set** and then transformed on the test set, guaranteeing zero data leakage."*

#### Q5: "How is your model explainable?"
> **Winning Answer:** *"We built an Explainable AI (XAI) feature attribution layer that decomposes the final price against the regional median baseline. It quantifies the exact dollar impact of neighborhood income ($r=0.69$), ocean proximity, property age depreciation, and room-to-bedroom density."*
