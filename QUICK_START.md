# Carbon Autopilot - Quick Start Guide 🚀

## What You Have

A **production-ready, full-stack sustainability dashboard** with:
- 🔐 User authentication (email + password)
- 📊 Real-time analytics with charts
- 🤖 AI-powered recommendations (Google Gemini 2.0)
- 🏆 Gamification & leaderboard
- 🌱 Professional eco-green design

**Everything is already configured and ready to run.**

---

## 1️⃣ Start the Dev Server

```bash
npm run dev
```

Visit: **http://localhost:3000**

✅ You should see the beautiful landing page

---

## 2️⃣ Create Your Account

1. Click **"Get Started Free"** or **"Sign Up"**
2. Enter email + password
3. Click **"Create Account"**
4. You're logged in! 🎉

---

## 3️⃣ Try the Dashboard

1. Click **"Dashboard"** tab
2. See the analytics overview
3. Scroll down to the **"Log Your Carbon Footprint"** form

---

## 4️⃣ Log Your First Emission

1. Select a **Category** (e.g., Transport)
2. Enter **Emissions** value (e.g., 25.5)
3. (Optional) Add source or notes
4. Click **"Log Emissions"**

**Watch the dashboard update in real-time!**

---

## 5️⃣ See AI Recommendations

1. Scroll to **"AI-Powered Recommendations"** section
2. Click **"Refresh"** button
3. Wait 3-5 seconds for AI to generate suggestions
4. See personalized strategies ranked by impact!

---

## 6️⃣ Explore Community Features

1. Click **"Community"** tab at the top
2. See the **"Global Leaderboard"** with top users
3. View the **"Weekly Challenge"** with progress bar
4. Check your **"Rank"** and **"Points"**

---

## 7️⃣ Earn Badges

1. Go back to **"Overview"** tab
2. Scroll to **"Achievements"** section
3. See badges you can unlock:
   - 🔥 **7-Day Tracker** - Log for 7 consecutive days
   - ⭐ **30-Day Champion** - Log for 30 consecutive days
   - 🌱 **Eco Warrior** - Reduce monthly emissions by 50%
   - 👥 **Community Lover** - Join a challenge
   - 🔍 **Data Detective** - Log 100 entries
   - 🥋 **Carbon Ninja** - Reach top 10 leaderboard

---

## 📊 Try These Features

### Log Multiple Entries
```
Transport: 30kg
Energy: 15kg
Food: 8kg
Shopping: 5kg
```
💡 Watch the chart update and categories display in the pie chart

### Test Categories
- 🚗 **Transport** - Driving, flights
- ⚡ **Energy** - Electricity, heating
- 🍔 **Food** - Meals, meat consumption
- 🛍️ **Shopping** - Purchases, clothing
- ♻️ **Waste** - Recycling, disposal
- 📝 **Other** - Miscellaneous

### Check Statistics
- 📈 **Monthly Emissions** - Total for the month
- 📊 **Weekly Emissions** - Last 7 days
- 🔥 **Daily Streak** - Consecutive logging days
- ⭐ **Points** - Total gamification points

---

## 🎨 Design Features to Notice

✨ **Smooth Animations**
- Hover over cards to see scale animations
- Scroll through sections for staggered reveals
- Button clicks have haptic feedback

🎨 **Professional Colors**
- 🟢 Green primary (eco brand)
- 🔵 Blue secondary (trust)
- 🟡 Amber accent (energy)
- Responsive light/dark mode

📱 **Responsive Design**
- Try resizing your browser window
- Or use mobile device view (Dev Tools → Toggle Device Toolbar)
- Everything adapts perfectly

---

## 🚀 Deploy to Production

### One-Click Deployment to Vercel

1. Push to GitHub
   ```bash
   git add .
   git commit -m "Production Carbon Autopilot"
   git push origin main
   ```

2. Go to Vercel.com
3. Import GitHub repository
4. Environment variables auto-configured
5. Click Deploy ✅

**Your app is now live on the internet!**

---

## 📝 Explore the Code

### Key Files to Check

**Authentication**
```
lib/auth.ts          ← Better Auth setup
lib/auth-client.ts   ← Client auth utilities
```

**Database**
```
lib/db/index.ts      ← Drizzle ORM
lib/db/schema.ts     ← Database design (8 tables)
```

**Server Logic**
```
app/actions/carbon.ts              ← Tracking mutations
app/actions/ai-recommendations.ts  ← AI integration
```

**Dashboard Components**
```
components/dashboard/dashboard-client.tsx      ← Main component
components/dashboard/emissions-chart.tsx       ← Line chart
components/dashboard/category-breakdown.tsx    ← Pie chart
components/dashboard/recommendations-panel.tsx ← AI panel
components/dashboard/leaderboard.tsx           ← Rankings
components/dashboard/achievements-badges.tsx   ← Gamification
```

---

## 🐛 Troubleshooting

### App won't start
```bash
npm install
npm run dev
```

### Database connection error
- Check `.env.local` has `DATABASE_URL`
- Verify Neon connection string is correct

### Sign-in not working
- Verify `BETTER_AUTH_SECRET` is set in `.env.local`
- Check browser console for errors (F12)

### AI recommendations taking forever
- Google Gemini API might be slow first time
- Fallback recommendations appear after 10 seconds
- Refresh page to try again

---

## 📚 Learn More

**Read These Files:**
1. `README.md` - Full project documentation
2. `UPGRADE_SUMMARY.md` - What was built
3. `QUICK_START.md` - This file

**Explore Code:**
- Look at `app/page.tsx` - Beautiful landing page
- Check `app/dashboard/page.tsx` - Protected route
- Review `components/dashboard/` - All UI components

---

## 💡 Pro Tips

### Test Different Data
Try logging different categories to see:
- Category breakdown pie chart change
- Monthly/weekly stats update
- AI recommendations adjust to your patterns

### Check Mobile View
1. Press F12 in browser
2. Click Device Toolbar icon
3. Select iPhone/Android
4. See responsive design in action

### Inspect Network
1. Open DevTools (F12)
2. Go to Network tab
3. Click "Log Emissions"
4. See server action requests to `/api/trpc`
5. Watch real-time data sync

### Read Console Logs
1. Open DevTools Console
2. Look for `[v0] ...` debug messages
3. Helps understand data flow

---

## ✅ Checklist: First 10 Minutes

- [ ] Started dev server (`npm run dev`)
- [ ] Visited http://localhost:3000
- [ ] Created account with email + password
- [ ] Viewed landing page with features
- [ ] Logged into dashboard
- [ ] Added first carbon entry
- [ ] Saw chart update in real-time
- [ ] Generated AI recommendations
- [ ] Viewed community leaderboard
- [ ] Explored achievements section

**If all checked ✅ - Everything is working perfectly!**

---

## 🎯 Next Actions

### Immediate (Now)
- Try all features in the app
- Read the code
- Deploy to Vercel

### Short-term (This Week)
- Customize brand colors
- Add your name/info
- Share the live link

### Long-term (Portfolio)
- Add to resume
- Include in portfolio site
- Use as interview talking point

---

## 🌟 Show It Off

**Share Your Live App:**
```
"I built Carbon Autopilot, a full-stack AI-powered 
sustainability dashboard with authentication, 
real-time analytics, AI recommendations, and gamification. 
Built with Next.js 16, Drizzle ORM, Better Auth, 
and Google Gemini 2.0."

Live: [your-vercel-url]
GitHub: [your-github-repo]
```

---

## 📞 Questions?

**Check These Resources:**
- `README.md` - Full documentation
- `UPGRADE_SUMMARY.md` - What was built
- Code comments - Inline explanations
- Console logs - Debug information

---

## 🎉 You're Ready!

Everything you need is already set up and working.

**Go build something amazing!** 🚀

---

**Carbon Autopilot** - Making sustainability accessible through intelligent technology 🌱
