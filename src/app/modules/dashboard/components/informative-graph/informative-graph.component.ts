import { Component, Input, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ScaleType } from '@swimlane/ngx-charts';
import { UntypedFormGroup, FormControl } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { datePipe, GRAPHIC_DATE_FORMAT, MY_DATE_FORMATS, SAVE_DATE_FORMAT, SHOW_DATE_FORMAT } from 'src/app/core/utils/constants';
import { CaixaService } from 'src/app/modules/caixa/service/caixa.service';
import { CurrencyPipe } from '@angular/common';
import { EXPORT_ICON } from 'src/app/core/utils/icons';

interface graphData {
  name: string,
  series: any[]
}

interface expenseData {
  [key: string]: string,
  value: string
}

@Component({
  selector: 'rp-informative-graph',
  templateUrl: './informative-graph.component.html',
  styleUrls: ['./informative-graph.component.less'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class InformativeGraphComponent implements OnInit {
  data: graphData[] = [
    { name: 'Ganhos', series: [] },
    { name: 'Gastos', series: [] }
  ];
  expenseData: expenseData[] = []
  @Input() selectedDate: Date = new Date()
  todayDate: string = ''
  range = new UntypedFormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  // options
  showLegend = true;
  showLabels = true;
  animations = true
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  xAxisLabel = 'Data';
  yAxisLabel = 'Valores';
  timeline = true;

  colorScheme = {
    name: '',
    selectable: true,
    group: ScaleType.Linear,
    domain: ['#19AD79', '#FA4B4B']
  };

  currencyPipe = new CurrencyPipe('pt-Br')

  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer, private service: CaixaService
  ) {
    iconRegistry.addSvgIconLiteral(
      'export-icon',
      sanitizer.bypassSecurityTrustHtml(EXPORT_ICON)
    );
  }

  ngOnInit(): void {
    this.range.valueChanges.subscribe(change => {
      if (change.end != undefined) {
        const init = new Date(change.start)
        const end = new Date(change.end)

        var selectedGains: any[] = []
        var selectedExpenses: any[] = []

        for (var d = init; d <= end; d.setDate(d.getDate() + 1)) {
          this.service.getGainsByDate(datePipe.transform(d, SAVE_DATE_FORMAT)!).subscribe(r => {
            if (r.docs[0] != undefined) {
              const sum = r.docs.reduce((sum, obj) => {
                return sum + obj.data()['value']
              }, 0)

              selectedGains.push({
                value: sum,
                name: this.formatToDate(r.docs[0].data()['gainDate'])
              })
              this.data = [{
                name: 'Ganhos', series: selectedGains
              }, { name: 'Gastos', series: selectedExpenses }]
            }
          })
          this.service.getExpensesByDate(datePipe.transform(d, SAVE_DATE_FORMAT)!).subscribe(r => {
            if (r.docs[0] != undefined) {
              const sum = r.docs.reduce((sum, obj) => {
                this.expenseData.push({
                  description: obj.data()['description'],
                  responsibleName: obj.data()['responsibleName'],
                  value: `${this.currencyPipe.transform(obj.data()['value'] * -1, 'BRL')}`
                })
                return sum + obj.data()['value']
              }, 0)

              selectedExpenses.push({
                value: sum,
                name: this.formatToDate(r.docs[0].data()['expenseDate'])
              })
              this.data = [{
                name: 'Ganhos', series: selectedGains
              }, { name: 'Gastos', series: selectedExpenses }]
            }
          })
        }
      }
    })
  }

  exportData() {
    if (this.data.length <= 0)
      return

    const gainSum = this.data[0].series.reduce((sum, obj) => {
      return sum + obj.value
    }, 0)
    const expenseSum = this.data[1].series.reduce((sum, obj) => {
      return sum + obj.value
    }, 0)

    const doc = new jsPDF();

    const gainShow = [{
      name: 'Vendas no restaurante',
      value: `${this.currencyPipe.transform(gainSum, 'BRL')}`
    }]

    doc.text(`Período: ${datePipe.transform(this.range.value.start, SHOW_DATE_FORMAT)} até ${datePipe.transform(this.range.value.end, SHOW_DATE_FORMAT)}`, 14, 12)

    autoTable(doc, {
      columns: [
        { header: 'Receita operacional', dataKey: 'name' },
        { header: 'Valor total', dataKey: 'value' },
      ],
      body: gainShow,
    });
    autoTable(doc, {
      columns: [
        { header: 'Deduções da receita', dataKey: 'description' },
        { header: 'Responsável', dataKey: 'responsibleName' },
        { header: 'Valor total', dataKey: 'value' },
      ],
      body: this.expenseData,
    });
    autoTable(doc, {
      columns: [
        { header: '=Resultado do balanço' },
        { header: `${this.currencyPipe.transform(gainSum - expenseSum, 'BRL')}` }
      ]
    })
    doc.save(`${datePipe.transform(this.range.value.start, SAVE_DATE_FORMAT)}-${datePipe.transform(this.range.value.end, SAVE_DATE_FORMAT)}.pdf`);
    doc.close;
  }

  graphicDateFormating(value: Date): string {
    return datePipe.transform(value, GRAPHIC_DATE_FORMAT)!
  }

  formatToDate(dateString: string) {
    const [day, month, year] = dateString.split('/');
    return new Date(+year, +month - 1, +day);
  }
}
