"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "../../lib/utils"
import { Button } from "../components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover"
import {Tag} from "../types";


interface tagProps {
  allTags : Tag[]
  tag : string
  setTag : (string) => void
}

export function ComboboxDemo({allTags, tag, setTag} : tagProps) {
  const [open, setOpen] = React.useState(false)
  //const [value, setValue] = React.useState("")
  console.log(allTags)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {tag}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {allTags.map((framework, i) => (
              <CommandItem
                key={i}
                value={framework.tagName}
                onSelect={(currentValue) => {
                  setTag(currentValue === tag ? tag : currentValue)

                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    tag === framework.tagName ? "opacity-100" : "opacity-0"
                  )}
                />
                {framework.tagName}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}