package main

import (
	"io/ioutil"
	"regexp"
	"strings"
	"testing"
)

func TestCodeClean(t *testing.T) {
	a := asm{filename: "sources/commentstest.asm"}
	ba, err := ioutil.ReadFile(a.filename)
	if err != nil {
		t.Fatal(err)
	}
	asmStr := a.cleanCode(string(ba))
	if asmStr == "" {
		t.Fatal(errNoCode)
	}

	badSpaceTestRE := regexp.MustCompile(`(^\s)|(\s$)|(\s\s+)`)
	if badSpaceTestRE.MatchString(asmStr) {
		t.Fatalf("found extraneous space in testing file, file contents: '%v'", asmStr)
	}

	lines := strings.Split(asmStr, "\n")
	for l, line := range lines {
		if strings.Contains(line, ";") {
			t.Fatalf("found comment in line %d: %s\n", l+1, line)
		}
		if badSpaceTestRE.MatchString(line) {
			t.Fatalf("found extraneous line %d: %s\n", l+1, line)
		}
	}
}
