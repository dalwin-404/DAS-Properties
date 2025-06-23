#!/usr/bin/env python3
"""
Script to migrate existing content from HTML files to Strapi CMS
"""

import requests
import json
import os
from bs4 import BeautifulSoup

# Strapi configuration
STRAPI_URL = "http://localhost:1337"
ADMIN_EMAIL = "admin@dasproperties.com"
ADMIN_PASSWORD = "DASProperties2024!"

def login_to_strapi():
    """Login to Strapi and get JWT token"""
    login_url = f"{STRAPI_URL}/admin/login"
    login_data = {
        "email": ADMIN_EMAIL,
        "password": ADMIN_PASSWORD
    }
    
    response = requests.post(login_url, json=login_data)
    if response.status_code == 200:
        return response.json()["data"]["token"]
    else:
        print(f"Login failed: {response.status_code} - {response.text}")
        return None

def create_hero_slides(token):
    """Create hero slides from homepage content"""
    
    hero_slides = [
        {
            "title": "Global Real Estate Investment Opportunity",
            "subtitle": "",
            "buttonText": "SEE DEVELOPMENT",
            "buttonLink": "global-opportunities.html",
            "order": 1,
            "active": True
        },
        {
            "title": "Aspen, Canary Wharf, London, E14",
            "subtitle": "Studios Prices from £499,950 and yields up to 5.5% gross. Over 63 storeys with incredible views across the London skyline",
            "buttonText": "SEE DEVELOPMENT",
            "buttonLink": "global-opportunities.html",
            "order": 2,
            "active": True
        },
        {
            "title": "Kingfisher, Manchester",
            "subtitle": "Prices from £250,000 with 10% Deposit Now. Up to 6.5% Yield",
            "buttonText": "SEE DEVELOPMENT",
            "buttonLink": "global-opportunities.html",
            "order": 3,
            "active": True
        },
        {
            "title": "Scholars Quarter, Jewellery Quarter, Birmingham",
            "subtitle": "Birmingham's most desirable central residential location. Prices from £235,000 with up to 6% Yield",
            "buttonText": "SEE DEVELOPMENT",
            "buttonLink": "global-opportunities.html",
            "order": 4,
            "active": True
        },
        {
            "title": "Sudbury Fields, Sudbury, Suffolk",
            "subtitle": "Maisonettes from £229,950 and houses from £315,000. Up To 5.1% gross 15% Deposit Required",
            "buttonText": "SEE DEVELOPMENT",
            "buttonLink": "global-opportunities.html",
            "order": 5,
            "active": True
        }
    ]
    
    url = f"{STRAPI_URL}/api/hero-slides"
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    
    for slide in hero_slides:
        data = {"data": slide}
        response = requests.post(url, json=data, headers=headers)
        if response.status_code in [200, 201]:
            print(f"Created hero slide: {slide['title']}")
        else:
            print(f"Failed to create hero slide: {response.status_code} - {response.text}")

def create_properties(token):
    """Create property entries from existing data"""
    
    properties = [
        {
            "title": "London Square Woolwich",
            "location": "Woolwich, London SE18",
            "category": "London",
            "priceFrom": "£408,000",
            "priceTo": "£550,000",
            "yield": "Up to 5.9%",
            "deposit": "10% Deposit Now",
            "completionDate": "Q1 2028",
            "shortDescription": "A development of 122 apartments across 14-storeys, offering excellent facilities.",
            "description": "Located in the Royal Borough of Greenwich in southeast London, Woolwich is fast becoming one of London's most desirable residential areas amongst the young crowd. Steeped in history, its cobbled streets and striking heritage architecture endow it with a distinct charm and the advent of the Elizabeth Line has proved a game-changer: Bond Street in 22 minutes and Canary Wharf in eight.",
            "slug": "london-woolwich",
            "featured": True,
            "region": "London",
            "propertyType": "apartment",
            "totalUnits": 122,
            "tenure": "999 Year Leasehold",
            "address": "London Square Woolwich, Woolwich New Road, London, SE18 6ED",
            "propertyDetails": {
                "bedrooms": ["1 BED APARTMENT: FROM £408,000", "2 BED APARTMENT: FROM £550,000"],
                "features": ["UP TO 5.9% YIELD", "ONLY 10% DEPOSIT REQUIRED"]
            },
            "paymentPlan": {
                "stages": ["10% on Exchange", "10% One Year Later", "80% on Completion"]
            }
        },
        {
            "title": "Sloane Court, Jewellery Quarter",
            "location": "Jewellery Quarter, Birmingham",
            "category": "Birmingham",
            "priceFrom": "£203,500",
            "priceTo": "",
            "yield": "Up to 6%",
            "deposit": "10% Deposit",
            "completionDate": "2025",
            "shortDescription": "Birmingham's most desirable central residential location.",
            "description": "Located in Birmingham's historic Jewellery Quarter, Sloane Court offers modern living in one of the city's most sought-after areas.",
            "slug": "birmingham-sloane",
            "featured": True,
            "region": "Birmingham",
            "propertyType": "apartment",
            "address": "Sloane Court, Jewellery Quarter, Birmingham"
        },
        {
            "title": "New Manchester",
            "location": "Manchester",
            "category": "Manchester",
            "priceFrom": "£200,000",
            "priceTo": "",
            "yield": "Up to 6.5%",
            "deposit": "10% Deposit",
            "completionDate": "2026",
            "shortDescription": "Modern development in the heart of Manchester.",
            "description": "New Manchester represents the future of urban living in one of the UK's most dynamic cities.",
            "slug": "new-manchester",
            "featured": True,
            "region": "Manchester",
            "propertyType": "apartment",
            "address": "New Manchester, Manchester"
        },
        {
            "title": "The Triangle, Ashford",
            "location": "Ashford, Kent",
            "category": "The South",
            "priceFrom": "£225,000",
            "priceTo": "",
            "yield": "Up to 5.5%",
            "deposit": "15% Deposit",
            "completionDate": "2025",
            "shortDescription": "Contemporary living in the heart of Kent.",
            "description": "The Triangle offers modern homes in Ashford, perfectly positioned for London commuters.",
            "slug": "south-triangle",
            "featured": True,
            "region": "The South",
            "propertyType": "apartment",
            "address": "The Triangle, Ashford, Kent"
        },
        {
            "title": "Sudbury Fields",
            "location": "Sudbury, Suffolk",
            "category": "East Anglia",
            "priceFrom": "£229,950",
            "priceTo": "£315,000",
            "yield": "Up to 5.1%",
            "deposit": "15% Deposit",
            "completionDate": "2025",
            "shortDescription": "Maisonettes and houses in beautiful Suffolk countryside.",
            "description": "Sudbury Fields offers a range of maisonettes and houses in the picturesque town of Sudbury.",
            "slug": "east-sudbury",
            "featured": True,
            "region": "East Anglia",
            "propertyType": "house",
            "address": "Sudbury Fields, Sudbury, Suffolk"
        },
        {
            "title": "Nebu Resort Residences",
            "location": "Bang Tao, Phuket",
            "category": "Thailand",
            "priceFrom": "$123,000",
            "priceTo": "",
            "yield": "Up to 8%",
            "deposit": "20% Deposit",
            "completionDate": "2026",
            "shortDescription": "Luxury resort residences in tropical paradise.",
            "description": "Nebu Resort Residences offers luxury living in one of Thailand's most beautiful locations.",
            "slug": "thailand-bang-tao",
            "featured": True,
            "region": "Thailand",
            "propertyType": "apartment",
            "address": "Bang Tao, Phuket, Thailand"
        }
    ]
    
    url = f"{STRAPI_URL}/api/properties"
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    
    for property_data in properties:
        data = {"data": property_data}
        response = requests.post(url, json=data, headers=headers)
        if response.status_code in [200, 201]:
            print(f"Created property: {property_data['title']}")
        else:
            print(f"Failed to create property: {response.status_code} - {response.text}")

def create_global_settings(token):
    """Create global settings entry"""
    
    global_settings = {
        "siteName": "DAS Properties",
        "siteDescription": "Your Trusted Global Property Investment Partner",
        "contactPhone": "01-903947770",
        "contactWhatsapp": "+44 7588 582993",
        "contactEmail": "info@daspropertiesinvest.co.uk",
        "missionStatement": "At DAS Properties and Investment Limited, we connect visionary investors with high-yield real estate opportunities across the UK, Europe, Africa, the Middle East and beyond. Whether you're looking to generate passive income, grow generational wealth or expand your global portfolio. We simplify the journey, reduce the risks and maximize your returns.",
        "socialMedia": {
            "trustpilot": "https://www.trustpilot.com/review/daspropertiesinvest.co.uk"
        },
        "footerContent": "DAS Properties and Investment Limited - Your trusted partner in global property investment."
    }
    
    url = f"{STRAPI_URL}/api/global-setting"
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    
    data = {"data": global_settings}
    response = requests.put(url, json=data, headers=headers)
    if response.status_code in [200, 201]:
        print("Created global settings")
    else:
        print(f"Failed to create global settings: {response.status_code} - {response.text}")

def create_pages(token):
    """Create page entries for static content"""
    
    pages = [
        {
            "title": "About Us",
            "slug": "about-us",
            "heroTitle": "About DAS Properties",
            "heroSubtitle": "Your Trusted Global Property Investment Partner",
            "content": "We serve as a partner and consultant to various customer segments. These range from seasoned landlords and institutional investors to individuals considering their first investments. Our clients count on us for expert investment strategies and sourcing high-value properties, and a comprehensive array of rental management services.",
            "pageType": "about",
            "metaDescription": "Learn about DAS Properties and our commitment to global property investment excellence."
        },
        {
            "title": "Contact Us",
            "slug": "contact",
            "heroTitle": "Get in touch with us today",
            "heroSubtitle": "Professional guidance for your property investment journey",
            "content": "If you have inquiries regarding property investments in the UK, require professional guidance, or wish to learn about our services, please complete the form, and a member of our team will contact you to assist you throughout the process.",
            "pageType": "contact",
            "metaDescription": "Contact DAS Properties for expert property investment guidance and support."
        },
        {
            "title": "Property Sourcing and Purchasing",
            "slug": "property-sourcing-and-purchasing",
            "heroTitle": "Property Sourcing and Purchasing",
            "heroSubtitle": "We do all the work for you",
            "content": "We do all the work from market research and property evaluation to negotiation and final purchase, we handle the entire process with precision and transparency. You sit back, relax, make profit and enjoy.",
            "pageType": "service",
            "metaDescription": "Professional property sourcing and purchasing services from DAS Properties."
        },
        {
            "title": "Rental Management",
            "slug": "rental-management",
            "heroTitle": "Rental Management",
            "heroSubtitle": "Hassle-free property management",
            "content": "Owning rental properties shouldn't mean managing tenants, chasing payments, or handling maintenance headaches. From tenant sourcing and lease agreements to rent collection and property upkeep, our team ensures your properties are well-managed and consistently profitable.",
            "pageType": "service",
            "metaDescription": "Comprehensive rental management services for property investors."
        }
    ]
    
    url = f"{STRAPI_URL}/api/pages"
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    
    for page in pages:
        data = {"data": page}
        response = requests.post(url, json=data, headers=headers)
        if response.status_code in [200, 201]:
            print(f"Created page: {page['title']}")
        else:
            print(f"Failed to create page: {response.status_code} - {response.text}")

def main():
    """Main function to migrate content"""
    print("Starting content migration to Strapi...")
    
    # Login to Strapi
    token = login_to_strapi()
    if not token:
        print("Failed to login to Strapi")
        return
    
    print("Successfully logged in to Strapi")
    
    # Create content
    print("\nCreating hero slides...")
    create_hero_slides(token)
    
    print("\nCreating properties...")
    create_properties(token)
    
    print("\nCreating global settings...")
    create_global_settings(token)
    
    print("\nCreating pages...")
    create_pages(token)
    
    print("\nContent migration completed!")

if __name__ == "__main__":
    main()

