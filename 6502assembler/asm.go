package main

import (
	"fmt"
	"io/ioutil"
	"regexp"
	"strings"
)

var (
	asmLineRE = regexp.MustCompile(`^(\S+) *(.*)`)
)

type asm struct {
	filename string
	out      string
	bytes    []byte
}

func (a *asm) strToBytes(line string) (ba []byte) {
	fmt.Println("line:", line)
	parts := asmLineRE.FindStringSubmatch(strings.ToLower(line))
	opcode := parts[1]
	// operands := parts[2]

	// fmt.Printf("opcode: %s\noperands: %s\n\n", opcode, operands)

	switch opcode {
	case "adc":
		//
	case "and":
		//
	case "asl":
		//
	case "bcc":
		//
	case "bcs":
		//
	case "beq":
		//
	case "bit":
		//
	case "bmi":
		//
	case "bne":
		//
	case "bpl":
		//
	case "bvc":
		//
	case "bvs":
		//
	case "clc":
		//
	case "cld":
		//
	case "cli":
		//
	case "clv":
		//
	case "cmp":
		//
	case "cpx":
		//
	case "cpy":
		//
	case "dec":
		//
	case "dex":
		//
	case "dey":
		//
	case "eor":
		//
	case "inc":
		//
	case "inx":
		//
	case "iny":
		//
	case "jmp":
		//
	case "jsr":
		//
	case "lda":
		//
	case "ldx":
		//
	case "ldy":
		//
	case "lsr":
		//
	case "nop":
		ba = []byte{opcodes["NOP"]}
	case "ora":
		//
	case "pha":
		//
	case "php":
		//
	case "pla":
		//
	case "plp":
		//
	case "rol":
		//
	case "ror":
		//
	case "rti":
		//
	case "rts":
		//
	case "sbc":
		//
	case "sec":
		//
	case "sed":
		//
	case "sei":
		//
	case "sta":
		//
	case "stx":
		//
	case "sty":
		//
	case "tax":
		//
	case "tay":
		//
	case "tsx":
		//
	case "txa":
		//
	case "txs":
		//
	case "tya":
		//
	}
	return
}

func (a *asm) assemble(printBytes bool) error {
	ba, err := ioutil.ReadFile(a.filename)
	if err != nil {
		return err
	}
	lines := strings.Split(string(ba), "\n")
	for l, line := range lines {
		line = strings.TrimSpace(line)
		if line == "" || line[0] == ';' {
			continue
		}

		commentI := strings.Index(line, ";")
		if commentI > -1 {
			line = line[:commentI]
		}

		if ba = a.strToBytes(line); len(ba) == 0 {
			return fmt.Errorf("Invalid syntax at line %d: %s", l+1, line)
		}
		a.bytes = append(a.bytes, ba...)
		// fmt.Println(l, line)
	}
	return err
}
