# Spec Delta

## Purpose

Defines the storefront's two-font type system: Chosense as the primary family for all functional text, and Magnolia Script as a secondary display-only accent, together with the rules that keep functional text readable and consistent across every page.

## ADDED Requirements

### Requirement: Exactly two typefaces are used

The storefront SHALL render using exactly two typefaces: Chosense as primary and Magnolia Script as secondary. No third typeface SHALL be loaded or referenced.

#### Scenario: Font families available to the application

- **WHEN** the set of font families the application can apply is inspected
- **THEN** it contains Chosense and Magnolia Script
- **AND** it contains no other family

#### Scenario: Previously used families are absent

- **WHEN** the application renders any page
- **THEN** no text is rendered in Lora, Raleway, or Great Vibes

### Requirement: Primary family carries all functional text

The primary family SHALL be the effective typeface for body copy, headings, navigation, form inputs, buttons, prices, and every other functional text, on every page.

#### Scenario: Default document rendering

- **WHEN** any page loads
- **THEN** body copy is rendered in the primary family

#### Scenario: Headings inherit the primary family

- **WHEN** a page renders a heading element
- **THEN** that heading is rendered in the primary family rather than a separate heading family

#### Scenario: Interactive and numeric text

- **WHEN** a user views a product price, a form input, or a button label
- **THEN** each is rendered in the primary family

### Requirement: Secondary family is restricted to display use

The secondary family SHALL be used only for decorative display accents such as wordmarks and select headings. It SHALL NOT be applied to body copy, form input text, price or numeric figures, navigation labels, or text below the minimum legible size.

#### Scenario: Decorative wordmark

- **WHEN** a brand wordmark or display heading is rendered
- **THEN** it MAY be rendered in the secondary family

#### Scenario: Functional text rejects the secondary family

- **WHEN** a product price, form field, or navigation label is rendered
- **THEN** it is not rendered in the secondary family

#### Scenario: Minimum legible size

- **WHEN** the secondary family is applied
- **THEN** the rendered text size is at or above the agreed legibility floor for a low-contrast connected script
- **AND** the floor is documented where the font utility is defined

### Requirement: Typography renders independently of third-party font CDNs

Text SHALL render in its intended typeface when no external font CDN is reachable, including in an offline build or a network-restricted preview environment.

#### Scenario: Font CDN unavailable

- **WHEN** the external font stylesheet request fails or is blocked
- **THEN** body text still renders in the primary family rather than falling back to a generic browser default

#### Scenario: Declared fallback stack

- **WHEN** the primary family fails to load
- **THEN** text falls back through an explicitly declared, brand-appropriate stack ending in a generic family

### Requirement: Every font utility class resolves to a defined family

The system SHALL NOT contain font utility classes that reference an undefined font family. Each font utility in use SHALL resolve to one of the two defined families.

#### Scenario: No silently inert font class

- **WHEN** a font utility class is applied in any component
- **THEN** that class maps to a family defined in the theme
- **AND** it does not silently fall through to the browser's default font

#### Scenario: Nav navigation typography

- **WHEN** the navigation links are inspected
- **THEN** they render in a defined family consistent with the rest of the interface

### Requirement: Weights match the fonts actually supplied

Every weight the interface requests SHALL be present in the supplied font files. The system SHALL NOT request a weight that the font does not provide.

#### Scenario: Unsupported weight is not requested

- **WHEN** a weight is absent from the supplied font file
- **THEN** no rule requests that weight
- **AND** the nearest available weight is used instead of a synthetic one

#### Scenario: Single-weight secondary family

- **WHEN** the secondary family provides only a regular weight
- **THEN** it is only ever requested at that weight

### Requirement: Spanish characters and punctuation render correctly

Both families SHALL render the accented characters and punctuation the Spanish-language interface depends on, without fallback glyphs or missing-glyph boxes.

#### Scenario: Accented characters

- **WHEN** text containing accented vowels or ñ is rendered in either family
- **THEN** each character renders as a glyph from that family rather than a fallback

#### Scenario: Inverted punctuation

- **WHEN** text containing opening or inverted punctuation is rendered
- **THEN** the characters are present and correctly formed

### Requirement: Family loading avoids blocking first paint

Loading the typefaces SHALL NOT prevent the page from rendering its content before the fonts resolve.

#### Scenario: Slow font response

- **WHEN** font files take longer than usual to respond
- **THEN** page text becomes visible in the declared fallback stack and then restyles once the family loads, without a blank or invisible page

#### Scenario: Font request fails entirely

- **WHEN** font loading fails
- **THEN** the page remains fully readable in the fallback stack