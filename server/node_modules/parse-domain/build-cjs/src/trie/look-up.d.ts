import { TrieNode } from "./nodes";
import { Label } from "../parse-domain";
export declare const lookUpTldsInTrie: (labels: Array<Label>, trie: TrieNode) => string[];
