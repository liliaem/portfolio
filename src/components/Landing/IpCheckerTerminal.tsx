"use client";

import React, { useEffect, useRef, useState } from "react";
import { callCheckApi } from "@/lib/checkApi";

// Terminal view of the checker: type commands, see the real API request,
// the HTTP status, the response time and the raw JSON response.

type Line = {
  kind: "cmd" | "info" | "req" | "ok" | "err" | "json";
  text: string;
};

const PROMPT = "lili@soc-lab:~$";

const STATUS_TEXT: Record<number, string> = {
  0: "Network Error",
  200: "OK",
  400: "Bad Request",
  422: "Unprocessable Content",
  429: "Too Many Requests",
  502: "Bad Gateway",
  504: "Gateway Timeout",
};

const HELP = [
  "commands:",
  "  check <ip or website>   look up a reputation, e.g. check 8.8.8.8",
  "  whoami                  who built this",
  "  clear                   clear the screen",
  "  help                    show this list",
  "tip: use ↑ and ↓ to repeat earlier commands",
].join("\n");

const COLORS: Record<Line["kind"], string> = {
  cmd: "text-[#f4e2ce]",
  info: "text-[#ab9cac]",
  req: "text-[#c98f87]",
  ok: "text-[#8fc1ae]",
  err: "text-[#e8a0a8]",
  json: "text-[#e9d8c4]",
};

export const IpCheckerTerminal = () => {
  const [lines, setLines] = useState<Line[]>([
    {
      kind: "info",
      text: "Type help to see the commands, or try: check wikipedia.org",
    },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keep the newest output in view
  useEffect(() => {
    const el = outputRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const print = (...newLines: Line[]) =>
    setLines((prev) => [...prev, ...newLines].slice(-200));

  async function run(raw: string) {
    const command = raw.trim();
    print({ kind: "cmd", text: `${PROMPT} ${command}` });
    if (command === "") return;
    setHistory((prev) => [...prev, command].slice(-50));
    setHistoryIndex(null);

    const [name, ...rest] = command.split(/\s+/);
    const arg = rest.join(" ");

    switch (name.toLowerCase()) {
      case "help":
        print({ kind: "info", text: HELP });
        return;
      case "clear":
        setLines([]);
        return;
      case "whoami":
        print({
          kind: "info",
          text: "lilia martínez: built this checker, its API and its database",
        });
        return;
      case "check":
        if (!arg) {
          print({ kind: "err", text: "usage: check <ip or website>" });
          return;
        }
        break;
      default:
        // A bare IP or website works too: "8.8.8.8" means "check 8.8.8.8"
        if (rest.length > 0 || !/[.:]/.test(name)) {
          print({
            kind: "err",
            text: `command not found: ${name}. Type help.`,
          });
          return;
        }
    }

    const target = name.toLowerCase() === "check" ? arg : name;
    setBusy(true);
    const call = await callCheckApi(target);
    setBusy(false);
    const ok = call.status >= 200 && call.status < 300;
    print(
      { kind: "req", text: `→ GET ${call.path}` },
      {
        kind: ok ? "ok" : "err",
        text: `← HTTP ${call.status} ${STATUS_TEXT[call.status] ?? ""} · ${call.ms} ms`,
      },
      { kind: "json", text: JSON.stringify(call.data, null, 2) },
    );
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowUp" && history.length > 0) {
      e.preventDefault();
      const i =
        historyIndex === null
          ? history.length - 1
          : Math.max(0, historyIndex - 1);
      setHistoryIndex(i);
      setInput(history[i]);
    } else if (e.key === "ArrowDown" && historyIndex !== null) {
      e.preventDefault();
      const i = historyIndex + 1;
      if (i >= history.length) {
        setHistoryIndex(null);
        setInput("");
      } else {
        setHistoryIndex(i);
        setInput(history[i]);
      }
    }
  }

  return (
    <div
      className="rounded-md bg-[#1b132b] text-[#f4e2ce] font-mono text-xs sm:text-sm cursor-text focus-within:ring-2 focus-within:ring-[#c98f87]"
      onClick={() => inputRef.current?.focus()}
    >
      <div
        ref={outputRef}
        role="log"
        aria-live="polite"
        aria-label="Terminal output"
        className="h-72 sm:h-80 overflow-y-auto p-4 flex flex-col gap-1"
      >
        {lines.map((line, i) => (
          <pre
            key={i}
            className={`whitespace-pre-wrap break-words ${COLORS[line.kind]}`}
          >
            {line.text}
          </pre>
        ))}
        {busy && <pre className={COLORS.info}>…</pre>}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (busy) return;
          const value = input;
          setInput("");
          run(value);
        }}
        className="flex items-center gap-2 border-t border-white/10 px-4 py-3"
      >
        <label htmlFor="terminal-input" className="shrink-0 text-[#c98f87]">
          {PROMPT}
        </label>
        <input
          id="terminal-input"
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          disabled={busy}
          maxLength={300}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          aria-label="Terminal command"
          className="flex-1 min-w-0 bg-transparent outline-none text-[#f4e2ce] caret-[#f4e2ce]"
        />
      </form>
    </div>
  );
};
