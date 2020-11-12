import { Component, OnInit } from '@angular/core';
import {ArticleCategoryContext, ArticleContext, ArticleStatus, ProfileContext} from '../../../../core/models';
import {Helpers} from '../../../../shared/helpers';
import {ActivatedRoute, Router} from '@angular/router';
import {CredentialsService} from '../../../../core/authentication/credentials.service';
import {ProfileService} from '../../../../core/authentication/profile.service';
import {ArticleService, SEOService} from '../../../../core/services';
import {Location} from '@angular/common';
import {trigger} from '@angular/animations';
import {fadeIn} from '../../../../shared/animations';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss'],
  animations : [trigger('fadeIn', fadeIn())]
})
export class ShowComponent implements OnInit {
  public isLike: boolean = false;
  public loggedIn : boolean;
  public article: ArticleContext;
  public articleByCategory: ArticleContext[];
  public recentArticles: ArticleContext[];
  public me: ProfileContext;
  public readonly helper = new Helpers();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private credentialService: CredentialsService,
    private profileService: ProfileService,
    private articleService: ArticleService,
    private seoService: SEOService
  ) {
    this.loggedIn = credentialService.isAuthenticated();
    if (this.loggedIn){
      this.profileService.getProfile().subscribe((profile: ProfileContext) => {
        if (profile) {
          this.me = profile;
        }
      });
    }
    this.getArticle();
  }

  ngOnInit() {}

  getArticle(){
    this.activatedRoute.params.subscribe(params => {
      if (params.slug){
        this.articleService.getArticleBySlug(params.slug).subscribe(res => this.handleResById(res));
      }
    });
    this.articleService.getArticleList().subscribe(
      res => this.handleResList(res),
    )
  }
  handleResList(res){
    this.recentArticles = res.articles.filter(article => article.status !== ArticleStatus.UNPUBLISHED);
  }
  handleResById(res){
    this.article = res;
    this.seoService.updateTitle(this.article.title);
    this.seoService.updateDescription(this.article.description);
    this.seoService.updateKeywords(String(this.article.tagList));
    if (this.loggedIn === true){
      this.isLike = this.article.favoriteClients.some(i => {
        if (i.email === this.me.email) {
          return true;
        }
        return false;
      });
    }
    this.getArticleByCategory(this.article.categories[0]);
    // this.seo.updateDescription(res.title + res.description);
  }
  getArticleByCategory(data: ArticleCategoryContext){
    this.articleService.getArticleFilter('category',data.slug).subscribe(res => this.handleResByCategory(res))
  }
  handleResByCategory(res){
    this.articleByCategory = res.articles;
  }
  updateComments(e){
    if (e){
      this.articleService.getArticleCommentListByArticle(this.article.slug).subscribe(res => this.handleResCommentList(res))
    }
  }
  handleResCommentList(res){
    this.article.comments = res.comments;
  }
  updateArticle(e){
    this.article = e;
  }
}
