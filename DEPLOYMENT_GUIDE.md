# Deployment & Go-Live Guide 🚀

## Current Status

**Project**: Carbon Autopilot  
**Repository**: aditya262006/carbon-autopilot-gdg-hacksprint  
**Live URL**: https://carbon-autopilot-gdg-hacksprint.vercel.app  
**Current Branch**: `v0/professional-resume-experience-1d7bf4e0`  
**Main Branch**: `main`  

---

## What's Been Deployed

The live Vercel deployment currently shows the **original MVP** version. Your new **upgraded, professional-grade version** is ready to deploy and will replace it.

### On Your Feature Branch (Ready to Deploy)
✅ Complete full-stack application with:
- Professional landing page with hero section
- Secure authentication (Better Auth)
- Real database (Neon PostgreSQL)
- Analytics dashboard with charts
- AI recommendations (Google Gemini 2.0)
- Gamification system (leaderboard, badges, streaks)
- Community features
- 1,871 lines of production code
- Professional UI/UX with animations

### Currently Live (Old Version)
- Original MVP with mock data
- Basic UI without animations
- No database backend
- No authentication system

---

## How to Go Live with Your New Version

### Option 1: Via GitHub (Recommended)
If you have GitHub access:

1. **Create a Pull Request**
   ```bash
   # Go to your GitHub repo
   # https://github.com/aditya262006/carbon-autopilot-gdg-hacksprint
   # Create PR from: v0/professional-resume-experience-1d7bf4e0 → main
   ```

2. **Merge to Main**
   - GitHub will automatically trigger Vercel to redeploy
   - This typically takes 2-5 minutes

3. **Check Deployment Status**
   - Visit: https://vercel.com/dashboard
   - Your project will show the build progress
   - Once complete, the new version goes live automatically

### Option 2: Merge Locally & Push
```bash
git checkout main
git merge v0/professional-resume-experience-1d7bf4e0
git push origin main
```

Vercel will automatically detect the push to main and redeploy your app.

### Option 3: Direct Vercel Connection
If you've connected Vercel to GitHub:
1. The settings already recognize this repo
2. Any push to `main` branch auto-deploys
3. Any push to feature branches creates preview URLs

---

## What You'll See After Deployment

### Landing Page
✨ Professional hero with call-to-action
📊 Feature showcase with 6 key benefits
✨ Smooth animations and modern design

### Sign-In / Sign-Up
🔐 Professional authentication forms
✅ Email validation
🔒 Secure password hashing

### Dashboard (After Login)
📊 Real-time analytics with 30-day chart
📈 Category breakdown pie chart
🔥 Daily tracking with streak counter
💡 AI-powered recommendations from Google Gemini
🏆 Global leaderboard with rankings
🏅 Achievement badges system
📋 Weekly challenges
⭐ Points & rewards system

---

## Verification Checklist

After deployment goes live, verify these work:

### Frontend
- [ ] Landing page loads without errors
- [ ] Sign-up form works
- [ ] Sign-in form works
- [ ] Dashboard renders (after login)
- [ ] Charts display data
- [ ] Animations are smooth

### Backend
- [ ] Database connection works
- [ ] Authentication persists sessions
- [ ] Can add carbon entries
- [ ] Data persists after refresh
- [ ] AI recommendations generate

### Performance
- [ ] Page loads in < 3 seconds
- [ ] No console errors
- [ ] Charts render smoothly
- [ ] Mobile responsive

---

## Environment Variables Verification

Verify these are set in Vercel Project Settings:

```
DATABASE_URL           ✓ (Neon)
BETTER_AUTH_SECRET     ✓ (set earlier)
```

The AI Gateway is built-in to Vercel, no additional config needed.

---

## Rollback Plan (If Needed)

If you need to revert to the old version:

```bash
# Push the old commit back to main
git checkout main
git reset --hard <old-commit-hash>
git push origin main --force
```

Vercel will automatically redeploy the previous version within minutes.

---

## Performance Targets

After deployment, your app should achieve:

| Metric | Target | Tool to Measure |
|--------|--------|-----------------|
| **LCP** | < 2.5s | Vercel Analytics |
| **FCP** | < 1.8s | Lighthouse |
| **CLS** | < 0.1  | Web Vitals |
| **TTI** | < 3.5s | Lighthouse |

Check with: `npm run build && npm run start` locally, then audit with Lighthouse

---

## Post-Deployment Steps

### 1. Monitor for Issues (First Hour)
- Check Vercel dashboard for errors
- Test authentication flow
- Verify database connectivity
- Test AI recommendations

### 2. Update Documentation
- Update README with live URL
- Share deployment link in team channels
- Add to portfolio website

### 3. Add to Portfolio
- Link to: https://carbon-autopilot-gdg-hacksprint.vercel.app
- Include GitHub repo link
- Mention tech stack: Next.js 16, Drizzle, Neon, Better Auth, Gemini AI

### 4. Request Feedback
- Share with team
- Gather bug reports
- Collect UX feedback

---

## Troubleshooting

### "App shows old version after deployment"
**Solution**: Clear browser cache or wait 5 minutes for CDN refresh

### "Build fails with database error"
**Solution**: Check DATABASE_URL is set correctly in Vercel Project Settings

### "500 errors on dashboard"
**Solution**: Check Vercel logs for details:
- https://vercel.com/dashboard → Select project → Deployments

### "AI recommendations not working"
**Solution**: Verify Vercel AI Gateway access in account settings

---

## Success Indicators

Your deployment is successful when:

✅ Landing page displays correctly  
✅ Authentication works (sign up, sign in, sign out)  
✅ Dashboard loads with current user data  
✅ Charts render with sample data  
✅ AI recommendations generate on demand  
✅ Leaderboard displays rankings  
✅ No console errors or 500 errors  
✅ Mobile view is responsive  
✅ Dark mode works  

---

## Next Steps

1. **Merge to Main** → Triggers Vercel redeploy
2. **Monitor Deployment** → Watch build complete
3. **Test Live App** → Click through all features
4. **Update Portfolio** → Add live URL to your projects
5. **Share Results** → Show employers/colleagues the finished product

---

## Support Resources

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Neon Console**: https://console.neon.tech
- **Next.js Docs**: https://nextjs.org/docs
- **Better Auth Docs**: https://www.better-auth.com
- **Drizzle Docs**: https://orm.drizzle.team

---

**Your professional, enterprise-grade sustainability app is ready for the world! 🌍**

Once deployed to main branch, your live application will showcase full-stack mastery, modern tech stack, professional design, and AI integration capabilities. This is a powerful portfolio piece. 🚀
