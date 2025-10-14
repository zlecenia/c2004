# Pages (Connect-Reports)

Ten katalog zawiera strony/sekcje raportów (executed/planned/export) i powiązane widoki. Każda strona powinna udostępniać metody statyczne:
- `static getContent(): string`
- `static getStyles(): string`

Wstrzykiwanie stylów per-strona odbywa się w `ConnectReportsPageManager`.
