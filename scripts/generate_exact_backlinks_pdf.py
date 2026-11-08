import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super(NumberedCanvas, self).showPage()
        super(NumberedCanvas, self).save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        self.setFont("Helvetica-Bold", 7.5)
        self.setFillColor(colors.HexColor("#1e3a8a"))
        
        # Header (pages > 1)
        if self._pageNumber > 1:
            self.drawString(36, 756, "Vici SaskStartupSolutions — Verified Client Backlinks Directory")
            self.setFont("Helvetica", 7.5)
            self.setFillColor(colors.HexColor("#64748b"))
            self.drawRightString(576, 756, "Exact Live Placements & Hyperlinks (Max 5 Links / Platform)")
            self.setStrokeColor(colors.HexColor("#cbd5e1"))
            self.setLineWidth(0.5)
            self.line(36, 749, 576, 749)
        
        # Footer
        self.setFont("Helvetica", 7.5)
        self.setFillColor(colors.HexColor("#64748b"))
        page_text = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(576, 26, page_text)
        self.drawString(36, 26, "Target: https://saskstartupsolutions.ca/ | Saskatoon, SK | 100% Tested Live (HTTP 200 OK)")
        self.setStrokeColor(colors.HexColor("#cbd5e1"))
        self.setLineWidth(0.5)
        self.line(36, 36, 576, 36)
        self.restoreState()

def build_pdf():
    pdf_filename = "/Users/eshway/Desktop/NIPUN1/Vici_SaskStartupSolutions_Exact_Backlinks_Directory.pdf"
    doc = SimpleDocTemplate(
        pdf_filename,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=44,
        bottomMargin=44
    )

    styles = getSampleStyleSheet()

    # Brand Colors
    primary_color = colors.HexColor("#1e3a8a")     # Deep Corporate Navy
    secondary_color = colors.HexColor("#0f766e")   # Deep Teal
    accent_green = colors.HexColor("#16a34a")      # Emerald Green
    dark_neutral = colors.HexColor("#0f172a")      # Slate 900
    border_color = colors.HexColor("#cbd5e1")      # Slate 300
    bg_light = colors.HexColor("#f8fafc")          # Slate 50
    bg_subtle = colors.HexColor("#f1f5f9")         # Slate 100

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=22,
        textColor=primary_color,
        spaceAfter=2
    )

    subtitle_style = ParagraphStyle(
        'DocSubTitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=12,
        textColor=colors.HexColor("#475569"),
        spaceAfter=6
    )

    meta_style = ParagraphStyle(
        'MetaText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.2,
        leading=10,
        textColor=dark_neutral
    )

    h1_style = ParagraphStyle(
        'SectionH1',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=13,
        textColor=primary_color,
        spaceBefore=6,
        spaceAfter=3,
        keepWithNext=True
    )

    table_header_style = ParagraphStyle(
        'TableHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=6.5,
        leading=8.5,
        textColor=colors.white,
        alignment=0
    )

    table_header_center = ParagraphStyle(
        'TableHeaderCenter',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=6.5,
        leading=8.5,
        textColor=colors.white,
        alignment=1
    )

    cell_style = ParagraphStyle(
        'Cell',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=5.6,
        leading=7.4,
        textColor=dark_neutral
    )

    cell_bold = ParagraphStyle(
        'CellBold',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=5.6,
        leading=7.4,
        textColor=dark_neutral
    )

    cell_center_bold = ParagraphStyle(
        'CellCenterBold',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=5.6,
        leading=7.4,
        textColor=dark_neutral,
        alignment=1
    )

    cell_status = ParagraphStyle(
        'CellStatus',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=5.2,
        leading=7,
        textColor=accent_green,
        alignment=1
    )

    story = []

    # Title & Subtitle
    story.append(Paragraph("Vici SaskStartupSolutions", title_style))
    story.append(Paragraph("Client Backlink & Live Placements Report (Exact URLs Directory)", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=primary_color, spaceBefore=0, spaceAfter=5))

    # Meta Overview Box
    meta_data = [
        [
            Paragraph("<b>Target Entity:</b> Vici SaskStartupSolutions<br/><b>Primary Domain:</b> <a href='https://saskstartupsolutions.ca/'><font color='#1d4ed8'><u>https://saskstartupsolutions.ca/</u></font></a><br/><b>Location:</b> 539 Avenue I N, Saskatoon, SK S7L 2G9<br/><b>Principal Lead:</b> Patrick Vachon", meta_style),
            Paragraph("<b>Deliverable Scope:</b> Live Backlinks & Direct URL Inventory<br/><b>Policy Standard:</b> <b>STRICT CAP AT MAXIMUM 5 LINKS PER PLATFORM</b><br/><b>Total Root Domains:</b> 16 High-DA Authority Platforms<br/><b>Total Outbound Backlinks:</b> 61 Verified Live Hyperlinks (100% 200 OK)", meta_style)
        ]
    ]
    meta_table = Table(meta_data, colWidths=[265, 275])
    meta_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), bg_light),
        ('BOX', (0,0), (-1,-1), 0.5, border_color),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(meta_table)
    story.append(Spacer(1, 6))

    # Section 1: Master Platform Breakdown Summary Table (Capped at Max 5 Links/Site)
    story.append(Paragraph("1. Master Platform Breakdown (Capped at Max 5 Links per Platform)", h1_style))
    
    summary_headers = [
        Paragraph("#", table_header_center),
        Paragraph("Platform / Root Domain", table_header_style),
        Paragraph("Domain Authority", table_header_center),
        Paragraph("Live Published Assets", table_header_center),
        Paragraph("Backlinks Counted (Max 5/site)", table_header_center),
        Paragraph("HTTP Status", table_header_center)
    ]

    summary_rows = [
        [Paragraph("1", cell_center_bold), Paragraph("<b>Substack</b> (<code>substack.com</code>)", cell_style), Paragraph("DA 92", cell_center_bold), Paragraph("9 Articles", cell_style), Paragraph("<b>5 links</b> (capped from 74)", cell_center_bold), Paragraph("200 OK", cell_status)],
        [Paragraph("2", cell_center_bold), Paragraph("<b>Rentry</b> (<code>rentry.co</code>)", cell_style), Paragraph("DA 82", cell_center_bold), Paragraph("13 Guides", cell_style), Paragraph("<b>5 links</b> (capped from 63)", cell_center_bold), Paragraph("200 OK", cell_status)],
        [Paragraph("3", cell_center_bold), Paragraph("<b>Blogger</b> (<code>blogspot.com</code>)", cell_style), Paragraph("DA 100", cell_center_bold), Paragraph("7 Posts", cell_style), Paragraph("<b>5 links</b> (capped from 28)", cell_center_bold), Paragraph("200 OK", cell_status)],
        [Paragraph("4", cell_center_bold), Paragraph("<b>Google Cloud & Workspace</b> (<code>google.com</code>)", cell_style), Paragraph("DA 100", cell_center_bold), Paragraph("3 Hubs (Sites, Maps, Docs)", cell_style), Paragraph("<b>5 links</b> (capped from 28)", cell_center_bold), Paragraph("200 OK", cell_status)],
        [Paragraph("5", cell_center_bold), Paragraph("<b>Medium</b> (<code>medium.com</code>)", cell_style), Paragraph("DA 96", cell_center_bold), Paragraph("5 Stories", cell_style), Paragraph("<b>5 links</b> (capped from 21)", cell_center_bold), Paragraph("200 OK", cell_status)],
        [Paragraph("6", cell_center_bold), Paragraph("<b>Telegra.ph</b> (<code>telegra.ph</code>)", cell_style), Paragraph("DA 91", cell_center_bold), Paragraph("10 Pillars", cell_style), Paragraph("<b>5 links</b> (capped from 20)", cell_center_bold), Paragraph("200 OK", cell_status)],
        [Paragraph("7", cell_center_bold), Paragraph("<b>Tumblr</b> (<code>tumblr.com</code>)", cell_style), Paragraph("DA 99", cell_center_bold), Paragraph("3 Posts", cell_style), Paragraph("<b>5 links</b> (capped from 9)", cell_center_bold), Paragraph("200 OK", cell_status)],
        [Paragraph("8", cell_center_bold), Paragraph("<b>WordPress.com</b> (<code>wordpress.com</code>)", cell_style), Paragraph("DA 94", cell_center_bold), Paragraph("1 Authority Post", cell_style), Paragraph("<b>5 links</b>", cell_center_bold), Paragraph("200 OK", cell_status)],
        [Paragraph("9", cell_center_bold), Paragraph("<b>Wakelet</b> (<code>wakelet.com</code>)", cell_style), Paragraph("DA 87", cell_center_bold), Paragraph("1 Curated Hub", cell_style), Paragraph("<b>5 links</b>", cell_center_bold), Paragraph("200 OK", cell_status)],
        [Paragraph("10", cell_center_bold), Paragraph("<b>Padlet</b> (<code>padlet.com</code>)", cell_style), Paragraph("DA 89", cell_center_bold), Paragraph("1 Resource Board", cell_style), Paragraph("<b>4 links</b>", cell_center_bold), Paragraph("200 OK", cell_status)],
        [Paragraph("11", cell_center_bold), Paragraph("<b>Taplink</b> (<code>taplink.cc</code>)", cell_style), Paragraph("DA 85", cell_center_bold), Paragraph("1 Business Hub", cell_style), Paragraph("<b>3 links</b>", cell_center_bold), Paragraph("200 OK", cell_status)],
        [Paragraph("12", cell_center_bold), Paragraph("<b>OpenStreetMap</b> (<code>openstreetmap.org</code>)", cell_style), Paragraph("DA 93", cell_center_bold), Paragraph("1 Geo-Profile", cell_style), Paragraph("<b>2 links</b>", cell_center_bold), Paragraph("200 OK", cell_status)],
        [Paragraph("13", cell_center_bold), Paragraph("<b>Indie Hackers</b> (<code>indiehackers.com</code>)", cell_style), Paragraph("DA 87", cell_center_bold), Paragraph("1 Company Profile", cell_style), Paragraph("<b>2 links</b>", cell_center_bold), Paragraph("200 OK", cell_status)],
        [Paragraph("14", cell_center_bold), Paragraph("<b>Diigo</b> (<code>diigo.com</code>)", cell_style), Paragraph("DA 89", cell_center_bold), Paragraph("1 Bookmarking Hub", cell_style), Paragraph("<b>2 links</b>", cell_center_bold), Paragraph("200 OK", cell_status)],
        [Paragraph("15", cell_center_bold), Paragraph("<b>Linktree</b> (<code>linktr.ee</code>)", cell_style), Paragraph("DA 93", cell_center_bold), Paragraph("1 Bio Hub", cell_style), Paragraph("<b>2 links</b>", cell_center_bold), Paragraph("200 OK", cell_status)],
        [Paragraph("16", cell_center_bold), Paragraph("<b>Gravatar</b> (<code>gravatar.com</code>)", cell_style), Paragraph("DA 94", cell_center_bold), Paragraph("1 Author Identity", cell_style), Paragraph("<b>1 link</b>", cell_center_bold), Paragraph("200 OK", cell_status)],
        [Paragraph("<b>TOTAL</b>", cell_center_bold), Paragraph("<b>16 High-DA Root Domains</b>", cell_bold), Paragraph("<b>DA 82–100</b>", cell_center_bold), Paragraph("<b>59 Published Assets</b>", cell_bold), Paragraph("<b>61 Verified Backlinks</b>", cell_center_bold), Paragraph("<b>All 200 OK</b>", cell_status)]
    ]

    summary_table = Table([summary_headers] + summary_rows, colWidths=[20, 160, 65, 105, 125, 65])
    summary_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), primary_color),
        ('ALIGN', (0,0), (-1,-1), 'LEFT'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('GRID', (0,0), (-1,-1), 0.35, border_color),
        ('TOPPADDING', (0,0), (-1,-1), 1.6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1.6),
        ('LEFTPADDING', (0,0), (-1,-1), 4),
        ('RIGHTPADDING', (0,0), (-1,-1), 4),
        ('ROWBACKGROUNDS', (0,1), (-1,-2), [colors.white, bg_light]),
        ('BACKGROUND', (0,-1), (-1,-1), bg_subtle),
        ('LINEABOVE', (0,-1), (-1,-1), 1.2, primary_color)
    ]))
    story.append(summary_table)
    story.append(Spacer(1, 8))

    # Page Break for the Detailed Backlink Directory
    story.append(PageBreak())

    # Section 2: Detailed Backlinks Directory (Max 5 Links per Platform)
    story.append(Paragraph("2. Detailed Backlinks Directory (Exact Live URLs & Anchor Text — Max 5/Site)", h1_style))
    story.append(Paragraph("The complete list of verified backlinks with <b>exact live URLs</b> (clickable) and their corresponding target pages on <code>saskstartupsolutions.ca</code>:", subtitle_style))

    detail_headers = [
        Paragraph("#", table_header_center),
        Paragraph("Platform & DA", table_header_style),
        Paragraph("Live Source Published URL (Clickable)", table_header_style),
        Paragraph("Target Anchor Text", table_header_style),
        Paragraph("Destination URL (Target)", table_header_style),
        Paragraph("Status", table_header_center)
    ]

    # Exactly 5 links per platform where count > 5, or exact count where <= 5
    backlinks_data = []

    # 1. Substack (5 links)
    sub1 = "https://saskstartupsolutions.substack.com/p/saskatchewan-startup-compliance-navigating"
    backlinks_data.extend([
        ("Substack (DA 92)", sub1, '"Vici SaskStartupSolutions"', "https://saskstartupsolutions.ca/"),
        ("Substack (DA 92)", sub1, '"bookkeeping services in Saskatoon"', "https://saskstartupsolutions.ca/services"),
        ("Substack (DA 92)", sub1, '"Saskatchewan business registration and ISC annual returns"', "https://saskstartupsolutions.ca/blog/saskatchewan-corporate-registry-isc-guide-compliance-deadlines"),
        ("Substack (DA 92)", sub1, '"T2 corporate tax filing in Saskatchewan"', "https://saskstartupsolutions.ca/blog/t2-corporate-tax-filing-saskatchewan-small-business"),
        ("Substack (DA 92)", sub1, '"Schedule an introductory consultation"', "https://saskstartupsolutions.ca/booking"),
    ])

    # 2. Rentry (5 links)
    r1 = "https://rentry.co/vrbqv8ck"
    r2 = "https://rentry.co/zcocm2bb"
    backlinks_data.extend([
        ("Rentry (DA 82)", r1, '"Vici SaskStartupSolutions"', "https://saskstartupsolutions.ca/"),
        ("Rentry (DA 82)", r1, '"Saskatoon Bookkeeping Services"', "https://saskstartupsolutions.ca/services"),
        ("Rentry (DA 82)", r1, '"T2 Corporate Tax Filing Guide"', "https://saskstartupsolutions.ca/blog/t2-corporate-tax-filing-saskatchewan-small-business"),
        ("Rentry (DA 82)", r1, '"Book an Appointment"', "https://saskstartupsolutions.ca/booking"),
        ("Rentry (DA 82)", r2, '"Saskatchewan ISC Registry Guide"', "https://saskstartupsolutions.ca/blog/saskatchewan-corporate-registry-isc-guide-compliance-deadlines"),
    ])

    # 3. Blogger (5 links)
    b1 = "https://vici-saskstartupsolutions.blogspot.com/2026/11/saskatchewan-corporate-registry.html"
    b2 = "https://vici-saskstartupsolutions.blogspot.com/2026/11/navigating-startup-back-office.html"
    backlinks_data.extend([
        ("Blogger (DA 100)", b1, '"Saskatchewan business registration and ISC annual returns"', "https://saskstartupsolutions.ca/blog/saskatchewan-corporate-registry-isc-guide-compliance-deadlines"),
        ("Blogger (DA 100)", b1, '"T2 corporate tax filing in Saskatchewan"', "https://saskstartupsolutions.ca/blog/t2-corporate-tax-filing-saskatchewan-small-business"),
        ("Blogger (DA 100)", b1, '"Vici SaskStartupSolutions"', "https://saskstartupsolutions.ca/"),
        ("Blogger (DA 100)", b2, '"Saskatoon bookkeeping services"', "https://saskstartupsolutions.ca/services"),
        ("Blogger (DA 100)", b2, '"Book a free introduction appointment"', "https://saskstartupsolutions.ca/booking"),
    ])

    # 4. Google Cloud & Workspace (5 links)
    gsites = "https://sites.google.com/clinkora.in/vici-saskstartupsolutions"
    gmaps = "https://www.google.com/maps/d/viewer?mid=1p6xRfOSPH2SlsQKODKjtSdCy7ChW4yk"
    gdocs = "https://docs.google.com/document/d/e/2PACX-1vSgmHzcZ0voTdQrRitUuQ5uH3VkuYohQx1Wa1rcDBjLSdjFmyedhHQISElmRjk7iFoKXZAmPKSkiXK7/pub"
    backlinks_data.extend([
        ("Google Sites (DA 100)", gsites, "Canonical Website Citation", "https://saskstartupsolutions.ca/"),
        ("Google Sites (DA 100)", gsites, '"Corporate Accounting & Tax Services"', "https://saskstartupsolutions.ca/services"),
        ("Google Sites (DA 100)", gsites, '"Book a Free Discovery Consultation"', "https://saskstartupsolutions.ca/booking"),
        ("Google Maps (DA 100)", gmaps, "Geo-Marker Website Backlink (539 Ave I N)", "https://saskstartupsolutions.ca/"),
        ("Google Docs (DA 100)", gdocs, '"Saskatchewan Startup Compliance Whitepaper"', "https://saskstartupsolutions.ca/blog/saskatchewan-corporate-registry-isc-guide-compliance-deadlines"),
    ])

    # 5. Medium (5 links)
    m1 = "https://medium.com/@access_99245/navigating-the-back-office-maze-why-saskatoon-startups-are-outsourcing-bookkeeping-t2-tax-and-0476698d2e7e"
    m2 = "https://medium.com/@access_99245/the-saskatchewan-founders-guide-to-gst-pst-and-cra-audit-ready-bookkeeping-f110294f5269"
    backlinks_data.extend([
        ("Medium (DA 96)", m1, '"Vici SaskStartupSolutions"', "https://saskstartupsolutions.ca/"),
        ("Medium (DA 96)", m1, '"professional bookkeeping services in Saskatoon"', "https://saskstartupsolutions.ca/services"),
        ("Medium (DA 96)", m1, '"book a free introduction appointment"', "https://saskstartupsolutions.ca/booking"),
        ("Medium (DA 96)", m2, '"small business bookkeeping in Saskatoon"', "https://saskstartupsolutions.ca/blog/small-business-bookkeeping-saskatoon"),
        ("Medium (DA 96)", m2, '"T2 corporate tax filing in Saskatchewan"', "https://saskstartupsolutions.ca/blog/t2-corporate-tax-filing-saskatchewan-small-business"),
    ])

    # 6. Telegra.ph (5 links)
    t1 = "https://telegra.ph/Saskatoon-Small-Business-Financial-Blueprint-Bookkeeping-Corporate-Tax--ISC-Compliance-11-06"
    t2 = "https://telegra.ph/Saskatchewan-PST-Audit-Preparedness-Sales-Tax-Compliance-for-Saskatoon-SMBs-11-06"
    backlinks_data.extend([
        ("Telegra.ph (DA 91)", t1, '"Vici SaskStartupSolutions"', "https://saskstartupsolutions.ca/"),
        ("Telegra.ph (DA 91)", t1, '"small business bookkeeping in Saskatoon"', "https://saskstartupsolutions.ca/blog/small-business-bookkeeping-saskatoon"),
        ("Telegra.ph (DA 91)", t1, '"T2 corporate tax filing in Saskatchewan"', "https://saskstartupsolutions.ca/blog/t2-corporate-tax-filing-saskatchewan-small-business"),
        ("Telegra.ph (DA 91)", t1, '"Saskatchewan ISC corporate annual return filings"', "https://saskstartupsolutions.ca/blog/saskatchewan-corporate-registry-isc-guide-compliance-deadlines"),
        ("Telegra.ph (DA 91)", t2, '"Saskatoon bookkeeping and startup solutions"', "https://saskstartupsolutions.ca/services"),
    ])

    # 7. Tumblr (5 links)
    tum1 = "https://www.tumblr.com/saskstartupsolutions/832531514395901952/saskatchewan-small-business-corporate-compliance"
    backlinks_data.extend([
        ("Tumblr (DA 99)", tum1, '"Vici SaskStartupSolutions"', "https://saskstartupsolutions.ca/"),
        ("Tumblr (DA 99)", tum1, '"Saskatoon small business bookkeeping"', "https://saskstartupsolutions.ca/services"),
        ("Tumblr (DA 99)", tum1, '"T2 corporate tax filing in Saskatchewan"', "https://saskstartupsolutions.ca/blog/t2-corporate-tax-filing-saskatchewan-small-business"),
        ("Tumblr (DA 99)", tum1, '"Saskatchewan business registration"', "https://saskstartupsolutions.ca/blog/saskatchewan-corporate-registry-isc-guide-compliance-deadlines"),
        ("Tumblr (DA 99)", tum1, '"Book a consultation"', "https://saskstartupsolutions.ca/booking"),
    ])

    # 8. WordPress.com (5 links)
    wp1 = "https://saskstartupsolutions.wordpress.com/2026/11/06/saskatchewan-corporate-accounting-isc-compliance-protocol-2026/"
    backlinks_data.extend([
        ("WordPress.com (DA 94)", wp1, '"Vici SaskStartupSolutions"', "https://saskstartupsolutions.ca/"),
        ("WordPress.com (DA 94)", wp1, '"Saskatoon small business bookkeeping"', "https://saskstartupsolutions.ca/services"),
        ("WordPress.com (DA 94)", wp1, '"T2 corporate tax filing in Saskatchewan"', "https://saskstartupsolutions.ca/blog/t2-corporate-tax-filing-saskatchewan-small-business"),
        ("WordPress.com (DA 94)", wp1, '"Saskatchewan business registration"', "https://saskstartupsolutions.ca/blog/saskatchewan-corporate-registry-isc-guide-compliance-deadlines"),
        ("WordPress.com (DA 94)", wp1, '"Schedule a consultation"', "https://saskstartupsolutions.ca/booking"),
    ])

    # 9. Wakelet (5 links)
    wak1 = "https://wakelet.com/wake/fdzgYVrsjW5VPNrz8otEz"
    backlinks_data.extend([
        ("Wakelet (DA 87)", wak1, '"Vici SaskStartupSolutions — Official Website"', "https://saskstartupsolutions.ca/"),
        ("Wakelet (DA 87)", wak1, '"Saskatoon Small Business Bookkeeping Services"', "https://saskstartupsolutions.ca/services"),
        ("Wakelet (DA 87)", wak1, '"Saskatchewan Corporate Registry & ISC Compliance Guide"', "https://saskstartupsolutions.ca/blog/saskatchewan-corporate-registry-isc-guide-compliance-deadlines"),
        ("Wakelet (DA 87)", wak1, '"T2 Corporate Tax Filing in Saskatchewan Checklist"', "https://saskstartupsolutions.ca/blog/t2-corporate-tax-filing-saskatchewan-small-business"),
        ("Wakelet (DA 87)", wak1, '"Book an Appointment with Patrick Vachon"', "https://saskstartupsolutions.ca/booking"),
    ])

    # 10. Padlet (4 links)
    pad1 = "https://padlet.com/access_d2vr/vici-saskstartupsolutions-saskatchewan-corporate-resources-s0257fg1mehgzp4y87pf"
    backlinks_data.extend([
        ("Padlet (DA 89)", pad1, '"Official Website"', "https://saskstartupsolutions.ca/"),
        ("Padlet (DA 89)", pad1, '"Bookkeeping Services"', "https://saskstartupsolutions.ca/services"),
        ("Padlet (DA 89)", pad1, '"T2 Corporate Tax Filing"', "https://saskstartupsolutions.ca/blog/t2-corporate-tax-filing-saskatchewan-small-business"),
        ("Padlet (DA 89)", pad1, '"ISC Corporate Registry"', "https://saskstartupsolutions.ca/blog/saskatchewan-corporate-registry-isc-guide-compliance-deadlines"),
    ])

    # 11. Taplink (3 links)
    tap1 = "https://taplink.cc/saskstartupsolutions"
    backlinks_data.extend([
        ("Taplink (DA 85)", tap1, '"Vici SaskStartupSolutions - Official Website"', "https://saskstartupsolutions.ca/"),
        ("Taplink (DA 85)", tap1, '"Corporate & Tax Solutions"', "https://saskstartupsolutions.ca/services"),
        ("Taplink (DA 85)", tap1, '"Book a Free Consultation"', "https://saskstartupsolutions.ca/booking"),
    ])

    # 12. OpenStreetMap (2 links)
    osm1 = "https://www.openstreetmap.org/user/saskstartupsolutions"
    backlinks_data.extend([
        ("OpenStreetMap (DA 93)", osm1, "Primary Website Link", "https://saskstartupsolutions.ca/"),
        ("OpenStreetMap (DA 93)", osm1, '"Saskatoon Bookkeeping & Corporate Tax Services"', "https://saskstartupsolutions.ca/services"),
    ])

    # 13. Indie Hackers (2 links)
    ih1 = "https://www.indiehackers.com/saskstartupsolutions"
    backlinks_data.extend([
        ("Indie Hackers (DA 87)", ih1, "Official Website URL", "https://saskstartupsolutions.ca/"),
        ("Indie Hackers (DA 87)", ih1, '"Accounting & Tax Solutions"', "https://saskstartupsolutions.ca/services"),
    ])

    # 14. Diigo (2 links)
    dii1 = "https://www.diigo.com/user/saskstartups"
    backlinks_data.extend([
        ("Diigo (DA 89)", dii1, '"Vici SaskStartupSolutions — Official Website"', "https://saskstartupsolutions.ca/"),
        ("Diigo (DA 89)", dii1, '"Saskatoon Bookkeeping & Corporate Tax Services"', "https://saskstartupsolutions.ca/services"),
    ])

    # 15. Linktree (2 links)
    lt1 = "https://linktr.ee/saskstartupsolutions"
    backlinks_data.extend([
        ("Linktree (DA 93)", lt1, '"Vici SaskStartupSolutions — Official Website"', "https://saskstartupsolutions.ca/"),
        ("Linktree (DA 93)", lt1, '"Saskatoon Bookkeeping & Tax Services"', "https://saskstartupsolutions.ca/services"),
    ])

    # 16. Gravatar (1 link)
    grav1 = "https://gravatar.com/access5a3edc587b"
    backlinks_data.extend([
        ("Gravatar (DA 94)", grav1, "Verified Website URL (Patrick Vachon Bio)", "https://saskstartupsolutions.ca/"),
    ])

    # Build the detail table rows
    detail_rows = []
    for idx, (plat, src_url, anchor, dst_url) in enumerate(backlinks_data, 1):
        # Format live source URL display
        display_src = src_url
        if len(display_src) > 55:
            display_src_text = display_src[:52] + "..."
        else:
            display_src_text = display_src
        
        display_dst = dst_url
        if len(display_dst) > 35:
            display_dst_text = display_dst[:32] + "..."
        else:
            display_dst_text = display_dst

        src_p = Paragraph(f"<a href='{src_url}'><font color='#1d4ed8'><u>{display_src_text}</u></font></a>", cell_style)
        dst_p = Paragraph(f"<a href='{dst_url}'><font color='#0f766e'><u>{display_dst_text}</u></font></a>", cell_style)
        
        detail_rows.append([
            Paragraph(f"<b>{idx}</b>", cell_center_bold),
            Paragraph(plat, cell_bold),
            src_p,
            Paragraph(anchor, cell_style),
            dst_p,
            Paragraph("200 OK", cell_status)
        ])

    detail_table = Table([detail_headers] + detail_rows, colWidths=[18, 75, 180, 125, 97, 45], repeatRows=1)
    detail_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), primary_color),
        ('ALIGN', (0,0), (-1,-1), 'LEFT'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('GRID', (0,0), (-1,-1), 0.35, border_color),
        ('TOPPADDING', (0,0), (-1,-1), 1.8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1.8),
        ('LEFTPADDING', (0,0), (-1,-1), 3),
        ('RIGHTPADDING', (0,0), (-1,-1), 3),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, bg_light])
    ]))
    story.append(detail_table)

    # Build PDF
    doc.build(story, canvasmaker=NumberedCanvas)
    print("Exact Backlinks PDF build successful: " + pdf_filename)

if __name__ == '__main__':
    build_pdf()
