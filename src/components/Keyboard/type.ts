import type { Component } from "vue"

export type SingleKey = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '.' | 'done' | 'back' | 'calendar' | '+' | '-'

export type KeyItem = {
  key: SingleKey,
  text?: string,
  component?: Component
}