# 🚀 Production Setup Guide

## **Environment Variables Required**

Add these environment variables to your Vercel project settings:

### **Email Configuration**
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### **Stripe Configuration**
```
STRIPE_SECRET_KEY=sk_test_... (or sk_live_... for production)
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_... (or pk_live_... for production)
```

## **Step-by-Step Setup**

### **1. Email Setup (Gmail)**

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account Settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. **Add to Vercel**:
   - `EMAIL_USER`: your Gmail address
   - `EMAIL_PASS`: the app password you generated

### **2. Stripe Setup**

1. **Create Stripe Account**:
   - Go to [stripe.com](https://stripe.com)
   - Sign up for a free account
   - Complete business verification

2. **Get API Keys**:
   - Dashboard → Developers → API keys
   - Copy your publishable and secret keys

3. **Set Up Webhooks**:
   - Dashboard → Developers → Webhooks
   - Add endpoint: `https://www.solvdaisolutions.com/api/stripe-webhook`
   - Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`
   - Copy the webhook signing secret

4. **Add to Vercel**:
   - `STRIPE_SECRET_KEY`: Your Stripe secret key
   - `STRIPE_WEBHOOK_SECRET`: Webhook signing secret
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Your publishable key

### **3. Vercel Configuration**

1. **Add Environment Variables**:
   - Go to your Vercel project dashboard
   - Settings → Environment Variables
   - Add all variables listed above

2. **Deploy**:
   - Push your code to GitHub
   - Vercel will automatically deploy with new environment variables

## **Testing the Setup**

### **1. Test Email Notifications**
1. Generate a quote on your site
2. Click "Accept Quote"
3. Check your email (`gpeterson3030@gmail.com`) for the notification

### **2. Test Stripe Payments**
1. Use Stripe's test card numbers:
   - **Success**: `4242 4242 4242 4242`
   - **Decline**: `4000 0000 0000 0002`
2. Complete a test payment
3. Check for confirmation emails

### **3. Test Webhooks**
1. Go to Stripe Dashboard → Webhooks
2. Click on your webhook endpoint
3. Send test events to verify they're working

## **Production Checklist**

- [ ] Email credentials configured
- [ ] Stripe API keys set up
- [ ] Webhook endpoint configured
- [ ] Test payments working
- [ ] Email notifications working
- [ ] Payment success page working
- [ ] SSL certificate active
- [ ] Domain configured

## **Security Best Practices**

1. **Never commit environment variables** to your repository
2. **Use different keys** for development and production
3. **Regularly rotate** API keys and passwords
4. **Monitor webhook events** in Stripe dashboard
5. **Set up logging** for payment events

## **Monitoring & Analytics**

### **Stripe Dashboard**
- Monitor payments in real-time
- View customer data and analytics
- Track webhook events

### **Email Notifications**
- You'll receive emails for:
  - Quote acceptances
  - Successful payments
  - Failed payments

### **Vercel Analytics**
- Monitor site performance
- Track user behavior
- Monitor API endpoint usage

## **Support & Troubleshooting**

### **Common Issues**

1. **Email not sending**:
   - Check Gmail app password
   - Verify 2FA is enabled
   - Check Vercel environment variables

2. **Payment failing**:
   - Verify Stripe keys are correct
   - Check webhook configuration
   - Test with Stripe test cards

3. **Webhook errors**:
   - Verify webhook secret
   - Check endpoint URL
   - Monitor Stripe dashboard logs

### **Getting Help**

- **Stripe Support**: [support.stripe.com](https://support.stripe.com)
- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **Email Issues**: Check Gmail security settings

## **Next Steps**

Once everything is working:

1. **Set up production Stripe keys** (switch from test to live)
2. **Configure custom domain** for webhooks
3. **Set up monitoring** and alerting
4. **Create backup procedures**
5. **Document processes** for team members

---

**🎉 Congratulations!** Your payment system is now production-ready! 