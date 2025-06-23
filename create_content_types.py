#!/usr/bin/env python3
"""
Script to programmatically create Strapi content types and fields
for the DAS Properties CMS integration.
"""

import requests
import json
import time

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

def create_content_type(token, content_type_data):
    """Create a content type in Strapi"""
    url = f"{STRAPI_URL}/admin/content-type-builder/content-types"
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    
    response = requests.post(url, json=content_type_data, headers=headers)
    if response.status_code in [200, 201]:
        print(f"Successfully created content type: {content_type_data['contentType']['displayName']}")
        return True
    else:
        print(f"Failed to create content type: {response.status_code} - {response.text}")
        return False

def update_property_content_type(token):
    """Update the Property content type with all necessary fields"""
    
    # Complete Property content type structure
    property_content_type = {
        "contentType": {
            "displayName": "Property",
            "singularName": "property",
            "pluralName": "properties",
            "description": "",
            "collectionName": "",
            "attributes": {
                "title": {
                    "type": "string",
                    "required": True
                },
                "location": {
                    "type": "string",
                    "required": True
                },
                "category": {
                    "type": "string",
                    "required": False
                },
                "priceFrom": {
                    "type": "string",
                    "required": False
                },
                "priceTo": {
                    "type": "string",
                    "required": False
                },
                "yield": {
                    "type": "string",
                    "required": False
                },
                "deposit": {
                    "type": "string",
                    "required": False
                },
                "completionDate": {
                    "type": "string",
                    "required": False
                },
                "description": {
                    "type": "text",
                    "required": False
                },
                "shortDescription": {
                    "type": "text",
                    "required": False
                },
                "mainImage": {
                    "type": "media",
                    "multiple": False,
                    "required": False,
                    "allowedTypes": ["images"]
                },
                "gallery": {
                    "type": "media",
                    "multiple": True,
                    "required": False,
                    "allowedTypes": ["images"]
                },
                "slug": {
                    "type": "uid",
                    "targetField": "title",
                    "required": True
                },
                "featured": {
                    "type": "boolean",
                    "default": False
                },
                "propertyDetails": {
                    "type": "json",
                    "required": False
                },
                "paymentPlan": {
                    "type": "json",
                    "required": False
                },
                "mapLocation": {
                    "type": "json",
                    "required": False
                },
                "address": {
                    "type": "text",
                    "required": False
                },
                "tenure": {
                    "type": "string",
                    "required": False
                },
                "totalUnits": {
                    "type": "integer",
                    "required": False
                }
            }
        }
    }
    
    # Update the existing property content type
    url = f"{STRAPI_URL}/admin/content-type-builder/content-types/api::property.property"
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    
    response = requests.put(url, json=property_content_type, headers=headers)
    if response.status_code in [200, 201]:
        print("Successfully updated Property content type")
        return True
    else:
        print(f"Failed to update Property content type: {response.status_code} - {response.text}")
        return False

def create_page_content_type(token):
    """Create Page content type for static pages"""
    
    page_content_type = {
        "contentType": {
            "displayName": "Page",
            "singularName": "page",
            "pluralName": "pages",
            "description": "Static pages content",
            "collectionName": "",
            "attributes": {
                "title": {
                    "type": "string",
                    "required": True
                },
                "slug": {
                    "type": "uid",
                    "targetField": "title",
                    "required": True
                },
                "heroTitle": {
                    "type": "string",
                    "required": False
                },
                "heroSubtitle": {
                    "type": "string",
                    "required": False
                },
                "heroImage": {
                    "type": "media",
                    "multiple": False,
                    "required": False,
                    "allowedTypes": ["images"]
                },
                "content": {
                    "type": "richtext",
                    "required": False
                },
                "metaDescription": {
                    "type": "text",
                    "required": False
                },
                "metaKeywords": {
                    "type": "string",
                    "required": False
                }
            }
        }
    }
    
    return create_content_type(token, page_content_type)

def create_hero_slide_content_type(token):
    """Create Hero Slide content type for homepage slider"""
    
    hero_slide_content_type = {
        "contentType": {
            "displayName": "Hero Slide",
            "singularName": "hero-slide",
            "pluralName": "hero-slides",
            "description": "Homepage hero slider slides",
            "collectionName": "",
            "attributes": {
                "title": {
                    "type": "string",
                    "required": True
                },
                "subtitle": {
                    "type": "text",
                    "required": False
                },
                "backgroundImage": {
                    "type": "media",
                    "multiple": False,
                    "required": True,
                    "allowedTypes": ["images"]
                },
                "buttonText": {
                    "type": "string",
                    "required": False
                },
                "buttonLink": {
                    "type": "string",
                    "required": False
                },
                "order": {
                    "type": "integer",
                    "required": True,
                    "default": 1
                },
                "active": {
                    "type": "boolean",
                    "default": True
                }
            }
        }
    }
    
    return create_content_type(token, hero_slide_content_type)

def create_global_settings_content_type(token):
    """Create Global Settings single type for site-wide content"""
    
    global_settings_content_type = {
        "contentType": {
            "displayName": "Global Settings",
            "singularName": "global-setting",
            "pluralName": "global-settings",
            "description": "Site-wide settings and content",
            "collectionName": "",
            "kind": "singleType",
            "attributes": {
                "siteName": {
                    "type": "string",
                    "required": True,
                    "default": "DAS Properties"
                },
                "siteDescription": {
                    "type": "text",
                    "required": False
                },
                "logo": {
                    "type": "media",
                    "multiple": False,
                    "required": False,
                    "allowedTypes": ["images"]
                },
                "logoWhite": {
                    "type": "media",
                    "multiple": False,
                    "required": False,
                    "allowedTypes": ["images"]
                },
                "contactPhone": {
                    "type": "string",
                    "required": False
                },
                "contactWhatsapp": {
                    "type": "string",
                    "required": False
                },
                "contactEmail": {
                    "type": "email",
                    "required": False
                },
                "socialMedia": {
                    "type": "json",
                    "required": False
                },
                "partnerLogos": {
                    "type": "media",
                    "multiple": True,
                    "required": False,
                    "allowedTypes": ["images"]
                },
                "complianceLogos": {
                    "type": "media",
                    "multiple": True,
                    "required": False,
                    "allowedTypes": ["images"]
                },
                "footerContent": {
                    "type": "richtext",
                    "required": False
                }
            }
        }
    }
    
    # For single types, we need to use a different endpoint
    url = f"{STRAPI_URL}/admin/content-type-builder/content-types"
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    
    response = requests.post(url, json=global_settings_content_type, headers=headers)
    if response.status_code in [200, 201]:
        print("Successfully created Global Settings content type")
        return True
    else:
        print(f"Failed to create Global Settings content type: {response.status_code} - {response.text}")
        return False

def main():
    """Main function to create all content types"""
    print("Starting Strapi content type creation...")
    
    # Login to Strapi
    token = login_to_strapi()
    if not token:
        print("Failed to login to Strapi")
        return
    
    print("Successfully logged in to Strapi")
    
    # Update Property content type with all fields
    print("\nUpdating Property content type...")
    update_property_content_type(token)
    time.sleep(2)
    
    # Create Page content type
    print("\nCreating Page content type...")
    create_page_content_type(token)
    time.sleep(2)
    
    # Create Hero Slide content type
    print("\nCreating Hero Slide content type...")
    create_hero_slide_content_type(token)
    time.sleep(2)
    
    # Create Global Settings content type
    print("\nCreating Global Settings content type...")
    create_global_settings_content_type(token)
    time.sleep(2)
    
    print("\nContent type creation completed!")
    print("Please restart Strapi to apply all changes.")

if __name__ == "__main__":
    main()

