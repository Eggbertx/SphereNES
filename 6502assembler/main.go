// used for testing the bare-bones 6502 emulation

package main

import (
	"flag"
	"fmt"
	"os"
)

func main() {
	var printHex bool
	var a asm

	flag.BoolVar(&printHex, "printhex", false, "If set, prints the hex values instead of writing to a file")
	flag.StringVar(&a.filename, "in", "", "The input 6502 assembly file, required")
	flag.StringVar(&a.out, "out", "", "The binary file to output, required if printhex is not set")
	flag.Parse()

	if a.filename == "" {
		fmt.Println("Missing in value")
		flag.Usage()
		os.Exit(1)
	}
	if !printHex && a.out == "" {
		fmt.Println("Missing out value")
		flag.Usage()
		os.Exit(1)
	}
	err := a.assemble(printHex)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	}
	fmt.Println("Compilation successfull,", len(a.bytes), "bytes")
}
