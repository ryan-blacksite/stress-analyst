# stress-analyst
Standalone AI stress analyst bot for aerospace structural analysis.

## Intelligence Layer
The backend intelligence layer now lives in [src/server/index.ts](/C:/Projects/stress-analyst/src/server/index.ts).

Exports include:
1. `retrieveRelevantAnalysisReferences()` for the markdown-backed RAG pipeline.
2. `STRESS_ANALYST_TOOL_DEFINITIONS` and `executeStressTool()` for buckling, bearing, shear, full-analysis, material-property, and margin-of-safety tools.
3. `runStressAnalystLoop()` for the agentic tool-use loop with `RELEVANT ANALYSIS REFERENCES` prompt injection and `flagged_for_review` escalation.

## Environment
Set `OPENROUTER_API_KEY` before using the server-side intelligence layer.

Optional overrides:
1. `STRESS_ANALYST_CHAT_MODEL`
2. `STRESS_ANALYST_EMBEDDING_MODEL`
3. `OPENROUTER_HTTP_REFERER`
4. `OPENROUTER_APP_TITLE`
