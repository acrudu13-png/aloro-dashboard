---
sidebar_position: 16
---

# Custom Dashboards

Build analytics dashboards with drag-and-drop widgets.

## Overview

Custom Dashboards let you create personalized analytics views with:

- **Stat widgets** - Single metrics with trends
- **Chart widgets** - Visual data representations
- **Table widgets** - Detailed data listings

---

## Creating a Dashboard

### Step 1: Create

1. Navigate to **Dashboards**
2. Click **Create Dashboard**
3. Enter name and select icon
4. Save

### Step 2: Customize

1. Click **Unlock** to enable editing
2. Add widgets from preset or custom
3. Drag to arrange layout
4. Configure each widget
5. Click **Save** and **Lock**

---

## Widget Types

### Stat Widgets

Display single metrics with optional trends.

![Stat Widget](/img/widget-stat.png)

**Configuration:**

| Setting | Description |
|---------|-------------|
| **Label** | Display name |
| **Data Table** | Source data |
| **Aggregation** | COUNT, SUM, AVG, MAX, MIN |
| **Color** | Visual theme |
| **Mini Chart** | Show daily trend |
| **Comparison** | Compare to previous period |

**Examples:**
- Total Calls (COUNT, 30 days)
- Average Duration (AVG duration)
- Success Rate (calculated)

---

### Chart Widgets

Visualize data with 8 chart types:

| Type | Best For | Requires |
|------|----------|----------|
| **Line** | Trends over time | Group By Period |
| **Bar** | Category comparison | Group By |
| **Area** | Filled trends | Group By Period |
| **Pie** | Proportions | Group By |
| **Donut** | Pie with center | Group By |
| **Polar Area** | Magnitude via radius | Group By |
| **Radar** | Multi-axis comparison | Group By |
| **Radial Bar** | Progress percentage | Conditions |

**Configuration:**

| Setting | Description |
|---------|-------------|
| **Chart Type** | Visual style |
| **Data Table** | Source data |
| **Date Range** | Time period |
| **Group By** | Categorical grouping |
| **Group By Period** | Time-based grouping |
| **Conditions** | Filter data |

**Advanced Options:**
- Show grid lines
- Show legend
- Show tooltips
- Line curve (smooth/straight)
- Chart height

---

### Table Widgets

Display detailed data in tabular format.

**Configuration:**

| Setting | Description |
|---------|-------------|
| **Data Source** | Calls, leads, campaigns |
| **Columns** | Select visible fields |
| **Sort By** | Primary sort column |
| **Rows Per Page** | 1-100 |
| **Filters** | Data conditions |

**Features:**
- Clickable rows (link to details)
- Sortable columns
- Pagination
- Live filtering

---

## Data Sources

| Source | Available Fields |
|--------|------------------|
| **Calls** | Duration, status, cost, phone, assistant, date |
| **Leads** | Status, campaign, attempts, variables |
| **Campaigns** | Name, status, calls, completion rate |
| **Assistants** | Name, calls, success rate |
| **Phone Numbers** | Number, type, calls, status |

---

## Filtering System

### Date Ranges

| Preset | Description |
|--------|-------------|
| Today | Current day |
| Yesterday | Previous day |
| Last 7 Days | Rolling week |
| Last 30 Days | Rolling month |
| Last 90 Days | Rolling quarter |
| Custom | Specific range |

### Conditions

Build filters with:

| Operator | Use |
|----------|-----|
| Equals | Exact match |
| Not Equals | Exclude value |
| Contains | Partial match |
| Greater Than | Numeric comparison |
| Less Than | Numeric comparison |
| Is True/False | Boolean check |

**Example:**
```
Status = "completed" AND duration > 60
```

---

## Layout Best Practices

### Widget Sizing

| Widget Type | Recommended Width |
|-------------|-------------------|
| Stats | 3-4 columns (3-4 per row) |
| Charts | 6-12 columns |
| Tables | 12 columns (full width) |

### Organization

```
┌─────────────────────────────────────────────────┐
│  [Stat 1]  [Stat 2]  [Stat 3]  [Stat 4]         │
├─────────────────────────────────────────────────┤
│  [Chart - Full Width]                           │
├───────────────────────┬─────────────────────────┤
│  [Chart - Half]       │  [Chart - Half]         │
├───────────────────────┴─────────────────────────┤
│  [Table - Full Width]                           │
└─────────────────────────────────────────────────┘
```

### Tips

- KPIs at top (stats)
- Trend charts in middle
- Detail tables at bottom
- Group related metrics
- Use consistent colors

---

## Preset Widgets

Quick-start with 21 pre-built widgets:

| Preset | Type | Description |
|--------|------|-------------|
| 📊 Total Calls | Stat | All calls count |
| 📊 Success Rate | Stat | Completed % |
| 📊 Avg Duration | Stat | Mean call length |
| 📈 Calls Over Time | Chart | Line chart trend |
| 📈 Calls by Status | Chart | Pie distribution |
| 📋 Recent Calls | Table | Latest records |

Click any preset to add to your dashboard.

---

## Example Dashboards

### Sales Dashboard

**Widgets:**
1. **Total Leads Called** (Stat)
2. **Qualification Rate** (Stat with comparison)
3. **Meetings Booked** (Stat)
4. **Calls by Assistant** (Bar chart)
5. **Interest Level Distribution** (Pie chart)
6. **Recent Conversations** (Table with variables)

### Support Dashboard

**Widgets:**
1. **Total Calls** (Stat)
2. **Resolution Rate** (Stat)
3. **Avg Handle Time** (Stat with trend)
4. **Call Volume Trend** (Line chart)
5. **Issues by Category** (Donut chart)
6. **Call Log** (Table with transcripts)

### Campaign Performance

**Widgets:**
1. **Leads Contacted** (Stat)
2. **Completion Rate** (Radial bar)
3. **Calls Today** (Stat)
4. **Daily Progress** (Area chart)
5. **Lead Status Breakdown** (Bar chart)
6. **Campaign Leads** (Table)

---

## Radial Bar (Progress)

Special configuration for percentage-based goals:

**Settings:**
- Calculate as percentage of total
- Show footer with numbers
- Start/End angle
- Hollow size
- Gradient colors

**Example:**
```
Goal: 1000 calls
Current: 750

Display: 75% filled radial bar
Footer: "750 / 1,000 achieved"
```

---

## Dashboard Actions

| Action | Description |
|--------|-------------|
| **Unlock** | Enable editing mode |
| **Lock** | Save and disable editing |
| **Duplicate** | Copy dashboard |
| **Delete** | Remove dashboard |
| **Share** | Get shareable link |
| **Export** | Download data (CSV) |

---

## Best Practices

### Design

- Focus on key metrics
- Don't overcrowd
- Use consistent colors
- Enable relevant features

### Performance

- Limit widget count (10-15 max)
- Use appropriate date ranges
- Avoid redundant filters

### Maintenance

- Review regularly
- Remove unused widgets
- Update as needs change

---

## Next Steps

- [Calls Overview](/docs/calls/overview) - Understand call data
- [Call Insights](/docs/calls/insights) - Post-call variables for widgets
- [Campaigns](/docs/campaigns/overview) - Campaign metrics
